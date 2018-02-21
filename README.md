# Code
> EAN13 Utilerias
> By [Aldrin Gonzalez Cancino](https://github.com/sounix)

# Ejemplo

```js
const libreriaEAN13 = require('codeean')

const barcode = '7501011123588'

libreriaEAN13.isEAN13(barcode) // return true o false
libreriaEAN13.isValido(barcode) // return true o false
libreriaEAN13.generarDigitoVerificador( barcode.sliece(0, -1)) // return digito verificador

libreriaEAN13.stringDebug(barcode) // return una cadena
```