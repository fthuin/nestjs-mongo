module.exports = {
  name: 'emafeed',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/emafeed',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
