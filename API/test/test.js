const expect = require("chai").expect;
let chai = require('chai');
let chaiHttp = require('chai-http');
const axios = require("axios");
chai.use(chaiHttp);
let user;
describe("Routes' tests", function () {
    let base_url = "http://localhost:8080/"
    let simulation =
        {
            "cpf": "cpf_teste",
            "uf": "MG",
            "nasc": "01/01/1970",
            "valor": 120000,
            "num_parcelas": 15
        }
    let loan =
        {
            "cpf": "cpf_teste",
            "valor_parcela": 12345,
            "valor_requerido": 120000,
            "valor_total": 12345677890,
            "num_parcelas": 15,
            "juros": 0.1
        }
    let wrong_value = {
        "cpf": "cpf_teste",
        "uf": "MG",
        "nasc": "01/01/1970",
        "valor": 40000,
        "num_parcelas": 37
    }

    let wrong_parcel = {
        "cpf": "cpf_teste",
        "uf": "MG",
        "nasc": "01/01/1970",
        "valor": 150000,
        "num_parcelas": 370
    }

    it("should add a simulation to the db", function (done) {
        chai.request(base_url)
            .post('emprestimo')
            .send(simulation)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.emprestimo.cpf).to.equal(simulation.cpf);
                expect(res.body.emprestimo.uf).to.equal(simulation.uf);
                expect(res.body.emprestimo.nasc).to.equal(simulation.nasc);
                expect(res.body.emprestimo.valor).to.equal(simulation.valor);
                expect(res.body.emprestimo.num_parcelas).to.equal(simulation.num_parcelas);
                done();
            });
    });

    it("should not add a simulation with value < 50000", function (done) {
        chai.request(base_url)
            .post('emprestimo')
            .send(wrong_value)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                done();
            });
    });

    it("should not add a simulation with parcels > 360", function (done) {
        chai.request(base_url)
            .post('emprestimo')
            .send(wrong_parcel)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                done();
            });
    });

    it("should add a loan to the db", function (done) {
        chai.request(base_url)
            .post('finalizar')
            .send(loan)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.efetivado.cpf).to.equal(loan.cpf);
                expect(res.body.efetivado.valor_parcela).to.equal(loan.valor_parcela);
                expect(res.body.efetivado.valor_requerido).to.equal(loan.valor_requerido);
                expect(res.body.efetivado.valor_total).to.equal(loan.valor_total);
                expect(res.body.efetivado.num_parcelas).to.equal(loan.num_parcelas);
                expect(res.body.efetivado.juros).to.equal(loan.juros);
                done();
            });
    });

});


