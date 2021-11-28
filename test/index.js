const { Plake } = require('../dist')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('plake', () => {
  it('should global function works', (done) => {
    const app = new Plake()
    
    app.addGlobalFunction(() => {
      return { ok: true }
    }, 'a')

    const { server } = app

    chai
      .request(server)
      .get('/a')
      .end((err, res) => { 
        if (err) {
          done(err)
        }
        chai.expect(JSON.parse(res.text)).deep.equal({ ok: true })
        done()
      })
  })

  it('should group function works', (done) => {
    const app = new Plake()
    const group = {
      a: () => {
        return { ok: true }
      }
    }

    app.addGroup(group, 'group')

    const { server } = app

    chai
      .request(server)
      .get('/group/a')
      .end((err, res) => { 
        if (err) {
          done(err)
        }
        chai.expect(JSON.parse(res.text)).deep.equal({ ok: true })
        done()
      })
  })
})
