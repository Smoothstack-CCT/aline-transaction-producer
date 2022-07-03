import { MerchantData } from "../models/merchant.model";

export class RandomDataUtil {

    merchants: MerchantData[] = [
        { merchantCode: 'AMAZON', merchantName: 'Amazon', merchantType: 'ONLINE'},
        { merchantCode: 'WALMART', merchantName: 'Walmart', merchantType: 'STORE' },
        { merchantCode: 'TARGET', merchantName: 'Target', merchantType: 'STORE' },
        { merchantCode: 'STARBCKS', merchantName: 'Starbucks', merchantType: 'RESTAURANT' },
        { merchantCode: 'CMNCENTS', merchantName: 'CommonCents', merchantType: 'GAS' },
        { merchantCode: 'MAVERICK', merchantName: 'Maverick', merchantType: 'GAS' },
        { merchantCode: 'SVNELVN', merchantName: 'Seven Eleven', merchantType: 'GAS'},
        { merchantCode: 'OLDNAVY', merchantName: 'Old Navy', merchantType: 'CLOTHING' },
        { merchantCode: 'ROSSS', merchantName: 'Ross', merchantType: 'CLOTHING' },
        { merchantCode: 'WALGRNS', merchantName: 'Walgreens', merchantType: 'DRUG' },
        { merchantCode: 'CVSUS', merchantName: 'CVS', merchantType: 'DRUG' },
        { merchantCode: 'SHOECNVL', merchantName: 'Shoe Carnival', merchantType: 'STORE' },
        { merchantCode: 'MCDONLDS', merchantName: 'McDonalds', merchantType: 'RESTAURANT' },
        { merchantCode: 'BRGRKING', merchantName: 'Burger King', merchantType: 'RESTAURANT' },
        { merchantCode: 'WENDYS', merchantName: 'Wendy\'s', merchantType: 'RESTAURANT' },
        { merchantCode: 'CHIKFLA', merchantName: 'Chick Fil A', merchantType: 'RESTAURANT' },
        { merchantCode: 'CHIPOTLE', merchantName: 'Chipotle', merchantType: 'RESTAURANT' },
        { merchantCode: 'HOMDEPOT', merchantName: 'Home Depot', merchantType: 'STORE' },
        { merchantCode: 'APPLAPP', merchantName: 'Apple App Store', merchantType: 'ONLINE' },
        { merchantCode: 'GOOGPLY', merchantName: 'Google Play Store', merchantType: 'ONLINE' },
        { merchantCode: 'STEAM', merchantName: 'STEAM', merchantType: 'ONLINE' },
        { merchantCode: 'COSTCO', merchantName: 'Costco', merchantType: 'ONLINE' }
    ]

    get merchant(): MerchantData {
        return this.merchants[Math.floor(Math.random() * this.merchants.length)];
    }


}