import SellerAdmin from '../models/sellerAdmin';




export default {
  getAllBuyerAdmins() {
    return SellerAdmin.findAll();
  },

  async getBuyerAdminById(buyerAdminId) {
    try {
      const buyerAdmin = await SellerAdmin.findByPk(buyerAdminId);
      return buyerAdmin;
    } catch (error) {
      console.error('Error retrieving buyer admin by ID:', error);
      throw error;
    }
  },

  async createBuyerAdmin(buyerAdminData) {
    console.log(buyerAdminData);
    try {
      const newBuyerAdmin = await SellerAdmin.create(buyerAdminData);
      return newBuyerAdmin;
    } catch (error) {
      console.error('Error creating buyer admin:', error);
      throw error;
    }
  },

  async updateBuyerAdmin(buyerAdminId, buyerAdminData) {
    try {
      const buyerAdmin = await SellerAdmin.findByPk(buyerAdminId);
      if (buyerAdmin) {
        await buyerAdmin.update(buyerAdminData);
        return buyerAdmin;
      }
      return null;
    } catch (error) {
      console.error('Error updating buyer admin:', error);
      throw error;
    }
  },

  async deleteBuyerAdmin(buyerAdminId) {
    try {
      const buyerAdmin = await SellerAdmin.findByPk(buyerAdminId);
      if (buyerAdmin) {
        await buyerAdmin.destroy();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting buyer admin:', error);
      throw error;
    }
  },

  async sellerLogEmail(email, hashed_password) {
  
        try {
            const admin = await SellerAdmin.findOne({ where: { email, hashed_password } });
            return admin;
        } catch (error) {
            console.error('Error retrieving admin by login:', error);
            throw error;
        }
    },

};
