export interface Merchant {
    code: string;
    name: string;
    description: string | null;
    registeredAt: Date | null;
};

export type MerchantType = 'GAS' | 'GROCERY' | 'ONLINE' | 'STORE' | 'RESTAURANT' | 'INSURANCE' | 'MEDICAL' | 'DRUG' | 'CLOTHING';

export interface MerchantData {
    merchantCode: string;
    merchantName: string;
    merchantType: MerchantType;
}