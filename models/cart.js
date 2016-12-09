/**
 * Created by 김서진 on 2016-12-08.
 */

module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define("Cart", {
        // "User"부분 - 어떤 객체인지
      /*  ck_no: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "장바구니 id"
        },
        it_no: {
            type: DataTypes.INTEGER,
            // primaryKey:true,
            // unique: true,
            allowNull: false,
            comment: "아이템 id"
        },*/
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

        }
        //classMethods: relationShip 부분
    });
    return Cart;
}