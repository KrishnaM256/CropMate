import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileMap = {
      avatar: 'uploads/avatar',
      aadharCard: 'uploads/aadharCard',
      landOwnershipProof: 'uploads/landOwnershipProof',
      bankPassbook: 'uploads/bankPassbook/',
      businessLicense: 'uploads/businessLicense/',
      bankStatement: 'uploads/bankStatement/',
    }
    const folderPath = fileMap[file.fieldname] || 'uploads/others/'
    cb(null, folderPath) // call this call back function when there is no error i.e.,'null' then use '/uploads' as destination
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

export { upload }