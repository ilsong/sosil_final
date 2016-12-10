/**
 * Created by 김서진 on 2016-12-08.
 */

module.exports = function(sequelize, DataTypes) {
    var Checkout = sequelize.define("Checkout", {

        total: {
            type: DataTypes.INTEGER,
            // unique: true,
            allowNull: false,
            comment: "장바구니 총 가격"
        },
        total_point: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "장바구니 총 적립포인트"
        },
        payment: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "결제 방식"
        }
    }, {
        tableName: 'ckeckout',
        comment: "결제",
        classMethods: {
            associate: function(models) {
                Checkout.hasMany(models.Cart, {foreignKey: 'ck_id',onDelete:'CASCADE', onUpdate:'CASCADE'});
            }
        }
    });
    return Checkout;
}