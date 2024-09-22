const shopModels = require("../models/shop.models")
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
}

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {

      const shopHolder = await shopModels.findOne({ email }).lean()

      if (shopHolder) {
        return {
          code: 'xxxx',
          message: 'Shop already registered!',
          status: 'error'
        }
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newShop = await shopModels.create({
        name,
        email,
        password: hashedPassword,
        roles: [RoleShop.SHOP]
      })

      if (newShop) {
        // create privateKey, publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
        })
      }

    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error'
      }
    }
  }
}

module.exports = AccessService