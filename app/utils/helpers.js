const gc = require('../config/storage.config')
const bucket = gc.bucket('tsharefiles') // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

exports.uploadImage = (file) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file

    const blob = bucket.file(originalname.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
        resumable: false
    })
    blobStream.on('finish', () => {
        const publicUrl =
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        blob.makePublic(async function (error) {
            if (error) {
                console.log("Can not publis")
            } else {
                console.log("Success published")
            }
        })
        resolve(publicUrl)
    })
        .on('error', () => {
            reject(`Unable to upload image, something went wrong`)
        })
        .end(buffer)
})