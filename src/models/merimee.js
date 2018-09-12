var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var mongoosastic = require('mongoosastic')
var getElasticInstance = require('../elasticsearch')

const Schema = new mongoose.Schema({
  REF: { type: String, unique: true, index: true, trim: true },
  PRODUCTEUR: { type: String, default: '' },
  BASE: { type: String, default: 'Patrimoine architectural (Mérimée)' },
  CONTIENT_IMAGE: { type: String, default: '' },
  MEMOIRE: [{ ref: String, url: String }],
  POP_COORDINATES_POINT: {
    'type': { type: String, enum: ['Point'], default: 'Point' },
    coordinates: [{ type: [Number] }]
  },
  POP_COORDINATES_POLYGON: {
    'type': { type: String, enum: ['Polygon'], default: 'Polygon' },
    coordinates: [[{ type: [Number] }]]
  },
  POP_HAS_LOCATION: { type: [String], default: '' },
  POP_DATE: { type: [Number], default: [] },
  TOUT: { type: String, default: '' },
  ACTU: { type: String, default: '' },
  ADRS: { type: String, default: '' },
  AFFE: { type: String, default: '' },
  AIRE: { type: String, default: '' },
  APPL: { type: String, default: '' },
  APRO: { type: [String], default: [] },
  ARCHEO: { type: String, default: '' },
  AUTP: { type: [String], default: [] },
  AUTR: { type: [String], default: [] },
  CADA: { type: [String], default: [] },
  CANT: { type: String, default: '' },
  COLL: { type: [String], default: [] },
  COM: { type: String, default: '' },
  COOR: { type: String, default: '' },
  COORM: { type: String, default: '' },
  COPY: { type: [String], default: [] },
  COUV: { type: [String], default: [] },
  DATE: { type: [String], default: [] },
  DBOR: { type: String, default: '' },
  DOMN: { type: [String], default: [] },
  DENO: { type: [String], default: [] },
  DENQ: { type: String, default: '' },
  DEPL: { type: String, default: '' },
  DESC: { type: String, default: '' },
  DIMS: { type: String, default: '' },
  DMAJ: { type: String, default: '', es_type: "keyword" }, // The format of date is not a date object everywhere. I cant translate it to date without a deepclean
  DMIS: { type: String, default: '', es_type: "keyword" }, // The format of date is not a date object everywhere. I cant translate it to date without a deepclean
  DOSS: { type: String, default: '' },
  DPRO: { type: String, default: '' },
  DPT: { type: String, default: '' },
  EDIF: { type: String, default: '' },
  ELEV: { type: [String], default: [] },
  ENER: { type: [String], default: [] },
  ESCA: { type: [String], default: [] },
  ETAG: { type: [String], default: [] },
  ETAT: { type: String, default: '' },
  ETUD: { type: String, default: '' },
  GENR: { type: String, default: '' },
  HIST: { type: String, default: '' },
  HYDR: { type: String, default: '' },
  IMPL: { type: [String], default: [] },
  INSEE: { type: String, default: '' },
  INTE: { type: [String], default: [] },
  JATT: { type: [String], default: [] },
  JDAT: { type: [String], default: [] },
  LBASE2: { type: String, default: '' },
  LIEU: { type: String, default: '' },
  LOCA: { type: String, default: '' },
  MFICH: { type: String, default: '' },
  MOSA: { type: String, default: '' },
  MHPP: { type: String, default: '' },
  MICR: { type: String, default: '' },
  MURS: { type: [String], default: [] },
  NBOR: { type: String, default: '' },
  NOMS: { type: [String], default: [] },
  OBS: { type: String, default: '' },
  PAFF: { type: String, default: '' },
  PART: { type: [String], default: [] },
  PARN: { type: [String], default: [] },
  PDEN: { type: String, default: '' },
  PERS: { type: [String], default: [] },
  PLAN: { type: String, default: '' },
  PLOC: { type: String, default: '' },
  PPRO: { type: String, default: '' },
  PREP: { type: [String], default: [] },
  PROT: { type: [String], default: [] },
  PSTA: { type: String, default: '' },
  REFE: { type: [String], default: [] },
  REFP: { type: [String], default: [] },
  REFO: { type: [String], default: [] },
  REFO: { type: [String], default: [] },
  REG: { type: String, default: '' },
  REMA: { type: String, default: '' },
  REMP: { type: String, default: '' },
  RENV: { type: [String], default: [] },
  REPR: { type: String, default: '' },
  RFPA: { type: String, default: '' },
  SCLD: { type: [String], default: [] },
  SCLE: { type: [String], default: [] },
  SCLX: { type: [String], default: [] },
  SITE: { type: String, default: '' },
  STAT: { type: String, default: '' },
  TECH: { type: [String], default: [] },
  TICO: { type: String, default: '' },
  TOIT: { type: [String], default: [] },
  TYPO: { type: String, default: '' },
  VERT: { type: String, default: '' },
  REFIM: { type: String, default: '' },
  IMG: { type: [String], default: [] },
  VIDEO: { type: String, default: '' },
  DOSURL: { type: String, default: '' },
  DOSURLPDF: { type: String, default: '' },
  DOSADRS: { type: String, default: '' },
  LIENS: { type: [String], default: [] },
  IMAGE: { type: String, default: '' },
  VISI: { type: [String], default: [] },
  VOCA: { type: String, default: '' },
  VOUT: { type: [String], default: [] },
  WEB: { type: String, default: '' },
  ZONE: { type: String, default: '' },
  THEM: { type: String, default: '' },
  ACMH: { type: String, default: '' },
  ACURL: { type: String, default: '' },
  WADRS: { type: String, default: '' },
  WCOM: { type: String, default: '' },
  WRENV: { type: String, default: '' },
  REFM: { type: String, default: '' },
  CONTACT: { type: String, default: '' },
  IDAGR: { type: String, default: '' },
  LMDP: { type: String, default: '' },
  PINT: { type: String, default: '' },
  DLAB: { type: String, default: '' }
}, { collection: 'merimee' })

Schema.plugin(mongoosePaginate)
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: 'merimee',
  bulk: { size: 500, delay: 2000 }
})

Schema.pre('update', function (next, done) {
  switch (this.REF.substring(0, 2)) {
    case 'IA': this.DISCIPLINE = this.PRODUCTEUR = 'Inventaire'; break
    case 'PA': this.DISCIPLINE = this.PRODUCTEUR = 'Monument Historique'; break
    case 'EA': this.DISCIPLINE = this.PRODUCTEUR = 'Architecture'; break
    default: this.DISCIPLINE = this.PRODUCTEUR = 'Null'; break
  }

  this.CONTIENT_IMAGE = this.IMG ? 'oui' : 'non'
  next()
})

const object = mongoose.model('merimee', Schema)

object.createMapping({
  "mappings": {
    "merimee": {
      "properties": {
        "TICO": { "type": "text", "analyzer": "french", "fields": { "keyword": { "type": "keyword" } } },
        "REF": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PRODUCTEUR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "BASE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "CONTIENT_IMAGE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "MEMOIRE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "POP_COORDINATES_POINT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "POP_COORDINATES_POLYGON": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "POP_HAS_LOCATION": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "POP_DATE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "TOUT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ACTU": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ADRS": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "AFFE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "AIRE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "APPL": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "APRO": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ARCHEO": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "AUTP": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "AUTR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "CADA": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "CANT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "COLL": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "COM": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "COOR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "COORM": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "COPY": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "COUV": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DATE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DBOR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DOMN": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DENO": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DENQ": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DEPL": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DESC": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DIMS": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DMAJ": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DMIS": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DOSS": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DPRO": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DPT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "EDIF": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ELEV": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ENER": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ESCA": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ETAG": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ETAT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ETUD": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "GENR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "HIST": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "HYDR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "IMPL": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "INSEE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "INTE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "JATT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "JDAT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "LBASE2": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "LIEU": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "LOCA": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "MFICH": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "MOSA": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "MHPP": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "MICR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "MURS": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "NBOR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "NOMS": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "OBS": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PAFF": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PART": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PARN": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PDEN": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PERS": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PLAN": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PLOC": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PPRO": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PREP": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PROT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PSTA": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REFE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REFP": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REFO": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REFO": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REG": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REMA": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REMP": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "RENV": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REPR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "RFPA": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "SCLD": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "SCLE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "SCLX": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "SITE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "STAT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "TECH": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "TOIT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "TYPO": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "VERT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REFIM": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "IMG": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "VIDEO": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DOSURL": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DOSURLPDF": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DOSADRS": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "LIENS": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "IMAGE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "VISI": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "VOCA": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "VOUT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "WEB": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ZONE": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "THEM": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ACMH": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "ACURL": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "WADRS": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "WCOM": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "WRENV": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "REFM": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "CONTACT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "IDAGR": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "LMDP": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "PINT": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
        "DLAB": { "type": "text", "fields": { "keyword": { "type": "keyword" } } },
      }
    }
  }
}, function (err, mapping) {
  if (err) {
    console.log('error mapping created', err)
    return
  }
})

module.exports = object
