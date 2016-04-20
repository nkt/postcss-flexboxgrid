const postcss = require('postcss');

const px = (val) => val ? `${val}px` : '0';
const pct = (val) => val ? `${val}%` : '0';
const round = (val) => Number.isInteger(val) ? val : val.toPrecision(4);
const column = (columns, val) => pct(round((100 / columns) * val));

function flexboxgrid({ columns = 12, gutter = 30 } = {}) {
  const containerPadding = px(gutter / 2);
  const rowMargin = px(gutter / -2);
  const columnPadding = px(gutter / 2);

  return (css) => {
    css.walkDecls('flex-container', (decl) => {
      const { parent, value } = decl;

      if (value === 'auto' || value === 'fluid') {
        parent.append({ prop: 'margin-left', value: 'auto' });
        parent.append({ prop: 'margin-right', value: 'auto' });
      }

      if (value === 'fluid') {
        parent.append({ prop: 'padding-right', value: containerPadding });
        parent.append({ prop: 'padding-left', value: containerPadding });
      }

      decl.remove();
    });

    css.walkDecls('flex-row', (decl) => {
      const { parent, value } = decl;

      if (value === 'auto') {
        parent.append({ prop: 'box-sizing', value: 'border-box' });
        parent.append({ prop: 'display', value: 'flex' });
        parent.append({ prop: 'flex', value: '0 1 auto' });
        parent.append({ prop: 'flex-direction', value: 'row' });
        parent.append({ prop: 'flex-wrap', value: 'wrap' });
        parent.append({ prop: 'margin-left', value: rowMargin });
        parent.append({ prop: 'margin-right', value: rowMargin });
      }

      decl.remove();
    });

    css.walkDecls('flex-column', (decl) => {
      const { parent, value } = decl;

      parent.append({ prop: 'box-sizing', value: 'border-box' });
      parent.append({ prop: 'position', value: 'relative' });
      parent.append({ prop: 'min-height', value: '1px' });
      parent.append({ prop: 'padding-right', value: columnPadding });
      parent.append({ prop: 'padding-left', value: columnPadding });

      if (value === 'auto') {
        parent.append({ prop: 'flex', value: '1 0 0' });
        parent.append({ prop: 'max-width', value: '100%' });
      }

      if (/^\d+$/.test(value)) {
        const pct = column(columns, value);
        parent.append({ prop: 'flex', value: `0 0 ${pct}` });
        parent.append({ prop: 'max-width', value: pct });
      }

      decl.remove();
    });
  };
}

module.exports = postcss.plugin('postcss-flexboxgrid', flexboxgrid);
