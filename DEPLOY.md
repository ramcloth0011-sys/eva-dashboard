# EVA dashboard — deploy karne ka sabse aasan tarika

Isme koi coding nahi karni — bas upload aur click karna hai.

## Step 1 — GitHub par account banayein (agar nahi hai)

https://github.com/signup par jaake free account bana lein.

## Step 2 — Naya repository banayein

1. github.com par login karke top-right "+" → "New repository" par click karein
2. Naam dein: `eva-dashboard`
3. "Public" select karein, "Create repository" dabayein

## Step 3 — Yeh saari files upload karein

1. Naye bane repository page par "uploading an existing file" wale link par click karein
2. Is folder ki **saari files aur folders** (jaisi hain waisi structure ke saath — `src` folder ke andar wali files bhi) khींch kar (drag-drop) wahan daal dein
3. Neeche "Commit changes" button dabayein

## Step 4 — Vercel se connect karein

1. https://vercel.com par jaake "Continue with GitHub" se login karein
2. "Add New" → "Project" par click karein
3. Apni `eva-dashboard` repository dhoondh kar "Import" karein
4. Kuch bhi change kiye bina seedha "Deploy" button dabayein

Bas 1-2 minute mein Vercel khud hi build kar ke ek live link de dega, jaisa:

`https://eva-dashboard-yourname.vercel.app`

Yehi link ab kisi bhi browser, phone, laptop se khulega — Claude ke bahar bhi.

## Baad mein custom domain jodna

Vercel project ke "Settings" → "Domains" mein jaake apna domain (jaise `eva.elevateoutfit.com`) daal dein — Vercel jo DNS record dega, wo apni domain provider (GoDaddy/Namecheap) ki settings mein daal dein. 10-15 minute ka kaam hai.

## Agla step

Yeh abhi demo data ke saath chal raha hai (real image generate nahi karta). Jab humara backend (image generation) ready ho jaayega, uska URL is project mein daal denge — phir "naya task" banate hi asli image aayegi.
