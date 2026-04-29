module.exports = {
  default: {
    paths: [
      'features/**/*.feature'
    ],
    requireModule: [
      'ts-node/register'
    ],
    require: [
      'support/**/*.ts',
      'step-definitions/**/*.ts'
    ],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    publishQuiet: true
  }
};
