import * as apidoc from 'apidoc-core'
import * as fs from 'fs-extra'
import * as should from 'should'

describe('test generate doc', async function () {
  let logger = {
    debug  : console.log,
    verbose: console.log,
    info   : console.log,
    warn   : console.log,
    error  : console.log
  }

  before(async function () {
    fs.removeSync('./tmp/')
  })

  it('created docs should equal to expect', async function () {
    apidoc.setLogger(logger)
    apidoc.setGeneratorInfos({})
    apidoc.setPackageInfos({
      'name': 'test',
      'version': '0.0.0'
    })

    let api = apidoc.parse({
      src: 'test/src/'
    })
    let createdContent = JSON.parse(api.data)
    const {parameter, success} = createdContent[0]
    console.log(JSON.stringify(createdContent))

    should.equal(parameter.fields.Parameter[0].field, 'phone')
    should.equal(parameter.fields.Parameter[1].field, 'name')
    should.equal(parameter.fields.Parameter[2].field, 'age')

    const fields = success.fields['Success 200']
    should.equal(fields[0].field, 'userId')
    should.equal(fields[0].description, 'user\'s id')
    should.equal(fields[1].field, 'buttons')
    should.equal(fields[2].field, 'buttons.text')
  })
})
