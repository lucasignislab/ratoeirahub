type CheckoutProduct = "ads" | "pages" | "hub";
type CheckoutPlan = "Basic" | "Starter" | "Scale" | "Max";
type CheckoutBilling = "monthly" | "semiannual" | "annual";
type CheckoutNetworkTier = "one" | "two" | "all";

type BillingLinks = Record<CheckoutBilling, string>;
type PlanLinks = Record<CheckoutPlan, BillingLinks>;
type NetworkLinks = Record<CheckoutNetworkTier, PlanLinks>;

const CHECKOUT_LINKS = {
  ads: {
    one: {
      Basic: {
        monthly: "https://go.checkout-ra.com/subscribe/mensal-ratoeira-ads-basic-1-rede",
        semiannual: "https://go.checkout-ra.com/subscribe/a2beef85-7c26-4a7e-8f83-3a48bc521f00",
        annual: "https://go.checkout-ra.com/subscribe/a2bef376-afd1-4a06-9420-e089e70efad6",
      },
      Starter: {
        monthly: "https://go.checkout-ra.com/subscribe/mensal-ratoeira-ads-starter-1-rede",
        semiannual: "https://go.checkout-ra.com/subscribe/semestral-ratoeira-ads-starter-1-rede",
        annual: "https://go.checkout-ra.com/subscribe/anual-ratoeira-ads-starter-1-rede",
      },
      Scale: {
        monthly: "https://go.checkout-ra.com/subscribe/mensal-ratoeira-ads-scale-1-rede",
        semiannual: "https://go.checkout-ra.com/subscribe/semestral-ratoeira-ads-scale-1-rede",
        annual: "https://go.checkout-ra.com/subscribe/anual-ratoeira-ads-scale-1-rede",
      },
      Max: {
        monthly: "https://go.checkout-ra.com/subscribe/mensal-ratoeira-ads-max-1-rede",
        semiannual: "https://go.checkout-ra.com/subscribe/semestral-ratoeira-ads-max-1-rede",
        annual: "https://go.checkout-ra.com/subscribe/anual-ratoeira-ads-max-1-rede",
      },
    },
    two: {
      Basic: {
        monthly: "https://go.checkout-ra.com/subscribe/a2bef44b-a58f-4c3b-b939-2bc349d1231c",
        semiannual: "https://go.checkout-ra.com/subscribe/a2bef44b-b3fd-4d80-b5d0-1cf5ce1111c8",
        annual: "https://go.checkout-ra.com/subscribe/a2bef44b-c1de-4dfe-9d94-bba577b5d6c9",
      },
      Starter: {
        monthly: "https://go.checkout-ra.com/subscribe/mensal-ratoeira-ads-starter-2-redes",
        semiannual: "https://go.checkout-ra.com/subscribe/semestral-ratoeira-ads-starter-2-redes",
        annual: "https://go.checkout-ra.com/subscribe/anual-ratoeira-ads-starter-2-redes",
      },
      Scale: {
        monthly: "https://go.checkout-ra.com/subscribe/mensal-ratoeira-ads-scale-2-redes",
        semiannual: "https://go.checkout-ra.com/subscribe/semestral-ratoeira-ads-scale-2-redes",
        annual: "https://go.checkout-ra.com/subscribe/anual-ratoeira-ads-scale-2-redes",
      },
      Max: {
        monthly: "https://go.checkout-ra.com/subscribe/mensal-ratoeira-ads-max-2-redes",
        semiannual: "https://go.checkout-ra.com/subscribe/semestral-ratoeira-ads-max-2-redes",
        annual: "https://go.checkout-ra.com/subscribe/anual-ratoeira-ads-max-2-redes",
      },
    },
    all: {
      Basic: {
        monthly: "https://go.checkout-ra.com/subscribe/a2bef65e-ca1b-42ba-89c2-f0e3fadcc40a",
        semiannual: "https://go.checkout-ra.com/subscribe/a2bef65e-d7a0-4b6f-ad55-9a61bf40340c",
        annual: "https://go.checkout-ra.com/subscribe/a2bef65e-f489-4069-81b8-a94b6fda997c",
      },
      Starter: {
        monthly: "https://go.checkout-ra.com/subscribe/mensal-ratoeira-ads-starter-todas-as-redes",
        semiannual: "https://go.checkout-ra.com/subscribe/semestral-ratoeira-ads-starter-todas-as-redes",
        annual: "https://go.checkout-ra.com/subscribe/anual-ratoeira-ads-starter-todas-as-redes",
      },
      Scale: {
        monthly: "https://go.checkout-ra.com/subscribe/mensal-ratoeira-ads-scale-todas-as-redes",
        semiannual: "https://go.checkout-ra.com/subscribe/semestral-ratoeira-ads-scale-todas-as-redes",
        annual: "https://go.checkout-ra.com/subscribe/anual-ratoeira-ads-scale-todas-as-redes",
      },
      Max: {
        monthly: "https://go.checkout-ra.com/subscribe/mensal-ratoeira-ads-max-todas-as-redes",
        semiannual: "https://go.checkout-ra.com/subscribe/semestral-ratoeira-ads-max-todas-as-redes",
        annual: "https://go.checkout-ra.com/subscribe/anual-ratoeira-ads-max-todas-as-redes",
      },
    },
  },
  pages: {
    Basic: {
      monthly: "https://go.checkout-ra.com/subscribe/a2bf4e7b-057c-4bde-93ec-d98d832a61a4",
      semiannual: "https://go.checkout-ra.com/subscribe/a2bf4e7b-10e5-4c0a-92e4-9c8ba7cc3f6b",
      annual: "https://go.checkout-ra.com/subscribe/a2bf4e7b-1da9-4e6d-99e6-201139f5ada5",
    },
    Starter: {
      monthly: "https://go.checkout-ra.com/subscribe/a2bf55f0-8582-45c9-abc8-6c9a1b408a71",
      semiannual: "https://go.checkout-ra.com/subscribe/a2bf55f0-9422-41dd-8cb4-90cf02c820f7",
      annual: "https://go.checkout-ra.com/subscribe/a2bf55f0-a156-44c3-b314-f23393baf7a6",
    },
    Scale: {
      monthly: "https://go.checkout-ra.com/subscribe/a2bf5774-5cf2-4d5a-84de-17dfe209f7cb",
      semiannual: "https://go.checkout-ra.com/subscribe/a2bf5774-6a4d-4ced-9aa9-d9862f7d7708",
      annual: "https://go.checkout-ra.com/subscribe/a2bf5774-773a-4548-ae8d-d8a7c986acc1",
    },
    Max: {
      monthly: "https://go.checkout-ra.com/subscribe/a2bf585e-43b4-4a39-ab6b-6bc4324aabcf",
      semiannual: "https://go.checkout-ra.com/subscribe/a2bf585e-51d7-46da-b0ce-e33e373be4e2",
      annual: "https://go.checkout-ra.com/subscribe/a2bf585e-5ebe-4bfd-a508-2f25410a767a",
    },
  },
  hub: {
    one: {
      Basic: {
        monthly: "https://go.checkout-ra.com/subscribe/a2c31c03-0547-40a8-9fd4-8e3720c9e970",
        semiannual: "https://go.checkout-ra.com/subscribe/a2c32507-4adf-4ee0-874c-348f02ca403d",
        annual: "https://go.checkout-ra.com/subscribe/a2c3266a-f79a-4988-8a74-ef00ed5aafb0",
      },
      Starter: {
        monthly: "https://go.checkout-ra.com/subscribe/a2c32b4d-8349-487f-9cbf-889af504e3a9",
        semiannual: "https://go.checkout-ra.com/subscribe/semestral-ratoeira-hub-starter-1-rede",
        annual: "https://go.checkout-ra.com/subscribe/a2c37076-b98c-4c5c-bbc7-50e6cb2ecb57",
      },
      Scale: {
        monthly: "https://go.checkout-ra.com/subscribe/a2c32d63-25de-492e-bb27-3ac1e0be7e9c",
        semiannual: "https://go.checkout-ra.com/subscribe/a2c33948-9f8f-4922-8d2e-b29e20ac38ac",
        annual: "https://go.checkout-ra.com/subscribe/a2c37169-0a23-418a-b16c-1c83f670b966",
      },
      Max: {
        monthly: "https://go.checkout-ra.com/subscribe/a2c32e70-e3fe-445d-a802-0227faa84028",
        semiannual: "https://go.checkout-ra.com/subscribe/a2c33a8f-6ac8-4d35-a304-984b2c389958",
        annual: "https://go.checkout-ra.com/subscribe/a2c376f5-6d7c-4337-bd01-bd57a9ef4a21",
      },
    },
    two: {
      Basic: {
        monthly: "https://go.checkout-ra.com/subscribe/a2c32f64-e7ae-4b18-85d9-8364b0719cad",
        semiannual: "https://go.checkout-ra.com/subscribe/a2c33b88-1624-4d5f-9733-2ee2f76927db",
        annual: "https://go.checkout-ra.com/subscribe/a2c377e6-5271-46d0-ac9a-b5df610bc115",
      },
      Starter: {
        monthly: "https://go.checkout-ra.com/subscribe/a2c33053-36e5-4ca2-b9d8-bc343851b5de",
        semiannual: "https://go.checkout-ra.com/subscribe/a2c33c63-23de-4817-93f6-43cb397f0bf9",
        annual: "https://go.checkout-ra.com/subscribe/a2c378a4-617c-4289-8048-6a859b9502bf",
      },
      Scale: {
        monthly: "https://go.checkout-ra.com/subscribe/a2c33146-a0ee-4c68-a4be-388b4a02dfb3",
        semiannual: "https://go.checkout-ra.com/subscribe/a2c33d38-bbfb-4ac5-bb2f-01bdca1ad3e5",
        annual: "https://go.checkout-ra.com/subscribe/a2c37945-7e37-4a6c-bb2b-13847020b297",
      },
      Max: {
        monthly: "https://go.checkout-ra.com/subscribe/a2c33269-1245-4577-be2e-232830d2ddf3",
        semiannual: "https://go.checkout-ra.com/subscribe/a2c36bae-255d-4b69-b1a0-aa0d17ac2c47",
        annual: "https://go.checkout-ra.com/subscribe/a2c37a7d-2487-498d-95af-85ece41371d6",
      },
    },
    all: {
      Basic: {
        monthly: "https://go.checkout-ra.com/subscribe/a2c3335f-e3c9-424c-b8d4-18eefdf0a901",
        semiannual: "https://go.checkout-ra.com/subscribe/a2c36c99-fafd-417c-845b-5be73d108e8d",
        annual: "https://go.checkout-ra.com/subscribe/a2c37b40-e719-481e-a6c2-fddb3066e022",
      },
      Starter: {
        monthly: "https://go.checkout-ra.com/subscribe/a2c33463-1b7f-49af-b0f5-74db406c5e6d",
        semiannual: "https://go.checkout-ra.com/subscribe/a2c36d7f-e3ef-42c6-9308-0d3bb6a858de",
        annual: "https://go.checkout-ra.com/subscribe/a2c37be8-dd91-4786-8746-c318210fa21f",
      },
      Scale: {
        monthly: "https://go.checkout-ra.com/subscribe/a2c3355b-d293-407b-aa05-3590ba4d4117",
        semiannual: "https://go.checkout-ra.com/subscribe/a2c36e58-54a4-4653-bbd4-5a245d44ff7f",
        annual: "https://go.checkout-ra.com/subscribe/a2c37caa-048d-44bc-9ada-1a1e011c88fa",
      },
      Max: {
        monthly: "https://go.checkout-ra.com/subscribe/a2c33665-5473-4272-a378-bc29802c0426",
        semiannual: "https://go.checkout-ra.com/subscribe/a2c36f37-4e34-4b3c-a2b2-9e1b321837b9",
        annual: "https://go.checkout-ra.com/subscribe/a2c37e04-7840-48d3-b748-343b2b438a74",
      },
    },
  },
} as const satisfies { ads: NetworkLinks; pages: PlanLinks; hub: NetworkLinks };

export function getCheckoutUrl(
  product: CheckoutProduct,
  plan: CheckoutPlan,
  billing: CheckoutBilling,
  tier: CheckoutNetworkTier,
): string {
  if (product === "pages") return CHECKOUT_LINKS.pages[plan][billing];
  return CHECKOUT_LINKS[product][tier][plan][billing];
}
