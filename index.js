'use strict'

const chalk = require('chalk')
const padStart = require('lodash.padstart')

const NONSTRING_ERR = 'El codigo de barras debe ser una cadena'
const EMPTY_CODE_ERR = 'El codigo de barras no debe ser una cadena vacia'
const FORMAT_ERR = 'El codigo de barras no tiene un formato valido'

function isEAN13 (barcode) {
    if (typeof barcode !== 'string') throw new Error(NONSTRING_ERR)
    if (!barcode) throw new Error(EMPTY_CODE_ERR)
    return (/^(\d{13})$/.test(barcode))
}

function isValido (barcode) {
    validaBarcode(barcode)

    const digitoVerificador = barcode.slice(-1)
    const digitoGenerado = generarDigitoVerificador (
        barcode.slice(0,-1)
    )

    return (digitoVerificador === digitoGenerado)
}

function generarDigitoVerificador (barcode) {
    return String(
        (
          10 - (
            (
            rellenar13Digitos(barcode)
              .split('')
              .map(function (num, idx) {
                return (+num) * ((idx % 2 === 0) ? 3 : 1)
              })
              .reduce(function (prev, cur) {
                return prev + cur
              })
            ) % 10
          )
        ) % 10
      )
}

function stringDebug (barcode) {
    return `Tu CodigoBarras es: ${barcode},
        Pais: ${barcode.slice(0, 3)},
        Empresa: ${barcode.slice(3, 8)},
        Articulo: ${barcode.slice(8, 12)},
        Codigo Verificador: ${barcode.slice(-1)},
        Codigo Generado: ${generarDigitoVerificador(barcode.slice(0, -1))},
        Es Valido: ${(isValido(barcode)) ? chalk.green('Verdadero') : chalk.red('Falso') }
    `
}

function validaBarcode (barcode) {
    if (!isEAN13(barcode)) throw new Error(FORMAT_ERR)
}

function rellenar13Digitos (barcode) {
  return padStart(barcode, 13, '0')
}

exports.isEAN13 = isEAN13
exports.isValido = isValido
exports.generarDigitoVerificador = generarDigitoVerificador
exports.stringDebug = stringDebug
