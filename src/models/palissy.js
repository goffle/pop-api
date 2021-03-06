var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var mongoosastic = require("mongoosastic");
var getElasticInstance = require("../elasticsearch");

const Schema = new mongoose.Schema(
  {
    PRODUCTEUR: { type: String, default: "" },
    CONTIENT_IMAGE: { type: String, default: "" },
    POP_COORDONNEES: {
      lat: { type: Number },
      lon: { type: Number }
    },
    POP_CONTIENT_GEOLOCALISATION: {
      type: String,
      enum: ["oui", "non"],
      default: "non"
    },
    POP_COORDINATES_POLYGON: {
      type: { type: String, enum: ["Polygon"], default: "Polygon" },
      coordinates: [[{ type: [Number] }]]
    },
    BASE: { type: String, default: "Patrimoine mobilier (Palissy)" },
    MEMOIRE: [{ ref: String, url: String }],
    REF: { type: String, unique: true, index: true, trim: true },
    ACQU: { type: String, default: "" },
    ADRS: { type: String, default: "" },
    ADRS2: { type: String, default: "" },
    AFIG: { type: [String], default: [] },
    AIRE: { type: String, default: "" },
    APPL: { type: String, default: "" },
    ATEL: { type: String, default: "" },
    AUTP: { type: String, default: "" },
    AUTR: { type: [String], default: [] },
    BIBL: { type: String, default: "" },
    CANT: { type: String, default: "" },
    CATE: { type: [String], default: [] },
    COM: { type: String, default: "" },
    COM2: { type: String, default: "" },
    CONTACT: { type: String, default: "" },
    COOR: { type: String, default: "" },
    COORM: { type: String, default: "" },
    COPY: { type: String, default: "" },
    DATE: { type: [String], default: [] },
    DBOR: { type: [String], default: [] },
    DENO: { type: [String], default: [] },
    DENQ: { type: [String], default: [] },
    DEPL: { type: String, default: "" },
    DESC: { type: String, default: "" },
    DIMS: { type: String, default: "" },
    DMAJ: { type: String, default: "", es_type: "keyword" }, // The format of date is not a date object everywhere. I cant translate it to date without a deepclean
    DMIS: { type: String, default: "", es_type: "keyword" }, // The format of date is not a date object everywhere. I cant translate it to date without a deepclean
    DOMN: { type: String, default: "" },
    DOSADRS: { type: String, default: "" },
    DOSS: { type: [String], default: [] },
    DOSURL: { type: String, default: "" },
    DOSURLPDF: { type: String, default: "" },
    DPRO: { type: String, default: "" },
    DPT: { type: String, default: "" },
    EDIF: { type: String, default: "" },
    EDIF2: { type: String, default: "" },
    EMPL: { type: String, default: "" },
    EMPL2: { type: String, default: "" },
    ETAT: { type: [String], default: [] },
    ETUD: { type: String, default: "" },
    EXEC: { type: String, default: "" },
    EXPO: { type: String, default: "" },
    HIST: { type: String, default: "" },
    IDAGR: { type: [String], default: [] },
    IMAGE: { type: String, default: "" },
    IMG: { type: [String], default: [] },
    IMPL: { type: String, default: "" },
    INSC: { type: [String], default: [] },
    INSEE: { type: String, default: [] },
    INSEE2: { type: String, default: "" },
    INTE: { type: String, default: "" },
    JDAT: { type: [String], default: [] },
    LBASE2: { type: String, default: "" },
    LIENS: { type: [String], default: [] },
    LIEU: { type: String, default: "" },
    LMDP: { type: String, default: "" },
    LOCA: { type: String, default: "" },
    MATR: { type: [String], default: [] },
    MFICH: { type: [String], default: [] },
    MICR: { type: String, default: "" },
    MOSA: { type: String, default: "" },
    NART: { type: String, default: "" },
    NINV: { type: String, default: "" },
    NOMS: { type: [String], default: [] },
    NUMA: { type: String, default: "" },
    NUMP: { type: String, default: "" },
    OBS: { type: String, default: "" },
    ORIG: { type: String, default: "" },
    PAPP: { type: String, default: "" },
    PARN: { type: [String], default: [] },
    PART: { type: [String], default: [] },
    PDEN: { type: [String], default: [] },
    PDIM: { type: String, default: "" },
    PERS: { type: [String], default: [] },
    PETA: { type: String, default: "" },
    PHOTO: { type: String, default: "" },
    PINS: { type: String, default: "" },
    PINT: { type: String, default: "" },
    PLOC: { type: String, default: "" },
    PPRO: { type: String, default: "" },
    PREP: { type: String, default: "" },
    PROT: { type: String, default: "" },
    REFA: { type: [String], index: true, default: [] },
    REFE: { type: [String], default: [] },
    REFM: { type: String, default: "" },
    REFP: { type: [String], default: [] },
    REG: { type: String, default: "" },
    RENP: { type: [String], default: [] },
    RENV: { type: [String], default: [] },
    REPR: { type: [String], default: [] },
    SCLD: { type: [String], default: [] },
    SCLE: { type: [String], default: [] },
    SCLX: { type: [String], default: [] },
    SOUR: { type: String, default: "" },
    STAD: { type: [String], default: [] },
    STAT: { type: [String], default: [] },
    STRU: { type: [String], default: [] },
    THEM: { type: String, default: "" },
    TICO: { type: String, default: "" },
    TITR: { type: String, default: "" },
    TOUT: { type: String, default: "" },
    VIDEO: { type: [String], default: [] },
    VOLS: { type: String, default: "" },
    WADRS: { type: String, default: "" },
    WCOM: { type: String, default: "" },
    WEB: { type: String, default: "" },
    WRENV: { type: String, default: "" },
    ZONE: { type: String, default: "" }
  },
  { collection: "palissy" }
);

Schema.pre("update", function(next, done) {
  switch (this.REF.substring(0, 2)) {
    case "IM":
      this.PRODUCTEUR = "Inventaire";
      break;
    case "PM":
      this.PRODUCTEUR = "Monument Historique";
      break;
    case "EM":
      this.PRODUCTEUR = "Etat";
      break;
    default:
      this.PRODUCTEUR = "Null";
      break;
  }

  this.CONTIENT_IMAGE = this.IMG ? "oui" : "non";
  next();
});

Schema.plugin(mongoosePaginate);
Schema.plugin(mongoosastic, {
  esClient: getElasticInstance(),
  index: "palissy",
  bulk: { size: 500, delay: 2000 }
});

const object = mongoose.model("palissy", Schema);

module.exports = object;
