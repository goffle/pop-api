const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const Mnr = require('../models/mnr')

const { uploadFile, deleteFile, formattedNow } = require('./utils')


const router = express.Router()

router.put('/:ref', upload.any(), async (req, res) => {
  const ref = req.params.ref
  const notice = JSON.parse(req.body.notice)
  notice.DMAJ = formattedNow()

  try {
    const prevNotice = await Mnr.findOne({ REF: ref })
    await Promise.all([
      ...(prevNotice.VIDEO || []).filter(x => !(notice.VIDEO || []).includes(x)).map(f => deleteFile(f)),
      ...req.files.map(f => uploadFile(`mnr/${notice.REF}/${f.originalname}`, f)),
      Mnr.findOneAndUpdate({ REF: ref }, notice, { upsert: true, new: true })
    ])
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

router.post('/', upload.any(), (req, res) => {
    const notice = JSON.parse(req.body.notice);
    notice.DMIS = notice.DMAJ = formattedNow()
    const obj = new Mnr(notice);
    obj.save().then((e) => {
        res.send({ success: true, msg: "OK" })
    });
})

router.get('/:ref', (req, res) => {
    const ref = req.params.ref;
    Mnr.findOne({ REF: ref }, (err, notice) => {
        if (err || !notice) {
            res.sendStatus(404)
        } else {
            console.log('FOUND', notice)
            res.send(notice);
        }
    });
})

router.delete('/:ref', (req, res) => {
    const ref = req.params.ref;
    Mnr.findOneAndRemove({ REF: ref }, (error) => {
        if (error) return res.status(500).send({ error });
        return res.status(200).send({});
    });
})

module.exports = router
