/**
 * Created by 김서진 on 2016-12-08.
 */

module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define("Cart", {
        total: {
            type: DataTypes.INTEGER,
            // unique: true,
            allowNull: true,
            comment: "장바구니 총 가격"
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: "장바구니 총 적립포인트"
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
            comment: "물품개수"
        }
    }, {
        tableName: 'cart',
        comment: "장바구니",
        classMethods: {
            associate: function(models) {
                Cart.hasMany(models.Checkout, {foreignKey: 'ct_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
            }
        }
    });
    return Cart;
}