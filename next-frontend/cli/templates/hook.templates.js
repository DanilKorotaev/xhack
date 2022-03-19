const _ = require('lodash');

const hookTemplate = (name) => (
`export const ${name} = () => {
  
}
`
);

module.exports = {
  hookTemplate,
};
