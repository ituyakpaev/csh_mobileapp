import files from "@/middleware/v2/api/files";

export const URL = 'https://api.alinamakarova.ru/api/v1/'

//export const URL_OLD = 'https://alinamakarova.ru/lk_api/auth.php'

export const query = function(q) {
    if (q && Object.keys(q).length !== 0) {
        let params = new URLSearchParams()
        Object.keys(q).map(key => {
            params.append(key, q[key])
        })
        return '?' + params.toString()
    } else {
        return ''
    }
}

export const uploadFile = async function(file, crop = false) {
    if (file && file.name) {
        let result = null

        await files.uploadImage(file, crop)
            .then(res => {
                console.log(res)
                result = res.data.db
            })
            .catch(err => {
                console.log(err)
                throw(err)
            })

        return result
    } else {
        return null
    }
}


