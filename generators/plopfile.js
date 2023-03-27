module.exports = function (plop) {
  // component generator
  plop.setGenerator('component', {
    description: 'application component logic',
    prompts: [
      {
        type: 'input',
        name: 'type',
        message: 'component type please',
      },
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.vue',
        templateFile: 'templates/index.vue.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{type}}/{{pascalCase name}}/styles.scss',
        templateFile: 'templates/styles.scss.hbs',
      },
      {
        type: 'add',
        path: '../tests/unit/{{pascalCase name}}.spec.ts',
        templateFile: 'templates/tests.ts.hbs',
      },
    ],
  });
};
