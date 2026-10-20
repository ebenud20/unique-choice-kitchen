const P = {
    "bar": "img/bar.jpg",
    "basket": "img/basket.jpg",
    "bbqfish": "img/bbqfish.jpg",
    "beef": "img/beef.jpg",
    "bitterleaf": "img/bitterleaf.jpg",
    "chickenpie": "img/chickenpie.jpg",
    "counter": "img/counter.jpg",
    "crab": "img/crab.jpg",
    "dine": "img/dine.jpg",
    "doughnut": "img/doughnut.jpg",
    "eba": "img/eba.jpg",
    "egusi": "img/egusi.jpg",
    "friedfish": "img/friedfish.jpg",
    "friedrice": "img/friedrice.jpg",
    "fruitsalad": "img/fruitsalad.jpg",
    "front": "img/front.jpg",
    "goat": "img/goat.jpg",
    "jollof": "img/jollof.jpg",
    "juice": "img/juice.jpg",
    "logo": "img/logo.jpg",
    "noodles": "img/noodles.jpg",
    "ogbono": "img/ogbono.jpg",
    "oha": "img/oha.jpg",
    "okro": "img/okro.jpg",
    "okro2": "img/okro2.jpg",
    "pack": "img/pack.jpg",
    "parfait": "img/parfait.jpg",
    "peppersoup": "img/peppersoup.jpg",
    "pies": "img/pies.jpg",
    "plantain": "img/plantain.jpg",
    "popcorn": "img/popcorn.jpg",
    "poundo": "img/poundo.jpg",
    "salad": "img/salad.jpg",
    "semo": "img/semo.jpg",
    "shrimp": "img/shrimp.jpg",
    "sign": "img/sign.jpg",
    "snacks": "img/snacks.jpg",
    "snails": "img/snails.jpg",
    "spaghetti": "img/spaghetti.jpg",
    "tiger": "img/tiger.jpg",
    "van": "img/van.jpg",
    "vegsoup": "img/vegsoup.jpg",
    "whitesoup": "img/whitesoup.jpg",
    "wings": "img/wings.jpg",
    "yamegg": "img/yamegg.jpg",
    "yellow": "img/yellow.jpg",
    "yoghurt": "img/yoghurt.jpg",
    "zobo": "img/zobo.jpg"
};

// WhatsApp number: international format, no +, no spaces
const WA = '2347065783125';

// Menu: ["Dish name", "photo key"]. The photo key is optional.
const M = {
    "Main dishes": [
        ["Jollof Rice", "jollof"],
        ["Chinese Rice", "friedrice"],
        ["Fried Rice", "yellow"],
        ["Turkey", "wings"],
        ["Fried Fish, dodo and Rice", "friedfish"],
        ["Goat Meat", "goat"],
        ["Beef", "beef"],
        ["Salad", "salad"],
        ["Plantain", "plantain"],
        ["Stir Fried Spaghetti", "spaghetti"],
        ["Noodles", "noodles"],
        ["Barbecue Fish", "bbqfish"],
        ["Fried Yam & Egg", "yamegg"],
        ["Peppered Snails", "snails"]
    ],
    "Soups": [
        ["Egusi Soup", "egusi"],
        ["White Soup", "whitesoup"],
        ["Vegetable Soup", "vegsoup"],
        ["Oha Soup", "oha"],
        ["Ogbono Soup", "ogbono"],
        ["Bitter Leaf Soup", "bitterleaf"],
        ["Seafood Okra Soup", "okro"],
        ["Fisherman's Soup", "crab"],
        ["Pepper Soups (all kinds)", "peppersoup"]
    ],
    "Swallows": [
        ["Semo", "semo"],
        ["Eba", "eba"],
        ["Poundo Yam", "poundo"]
    ],
    "Pastries & snacks": [
        ["Meat Pie", "pies"],
        ["Chicken Pie", "chickenpie"],
        ["Milky Doughnut", "doughnut"],
        ["Sausage Rolls", "snacks"],
        ["Small Chops", "snacks"],
        ["Popcorn", "popcorn"]
    ],
    "Drinks & desserts": [
        ["Tigernut Drink", "tiger"],
        ["Parfait", "parfait"],
        ["Yoghurt", "yoghurt"],
        ["Zobo", "zobo"],
        ["Fruit Juice", "juice"],
        ["Fruit Salad", "fruitsalad"]
    ]
};

const $ = s => document.querySelector(s);
let cat = 'All';
let sel = new Set();

// Fill in the photos marked with data-k
document.querySelectorAll('[data-k]').forEach(i => i.src = P[i.dataset.k]);

// WhatsApp links
const link = t => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
['wa0', 'wa1', 'wa2'].forEach((id, i) => {
    $('#' + id).href = link([
        'Hello Unique Choice Kitchen, I would like to place an order.',
        'Hello Unique Choice Kitchen, I would like food for an event.',
        'Hello Unique Choice Kitchen, I have a question.'
    ][i]);
});

// Menu category tabs
function tabs() {
    $('#tabs').innerHTML = ['All', ...Object.keys(M)]
        .map(c => `<button aria-pressed="${c == cat}" data-c="${c}">${c}</button>`)
        .join('');
}

// Menu cards
function grid() {
    const q = $('#q').value.toLowerCase();
    let h = '';
    for (const [c, l] of Object.entries(M)) {
        if (cat == 'All' || cat == c) {
            for (const [n, k] of l) {
                if (n.toLowerCase().includes(q)) {
                    h += `<div class="it${sel.has(n) ? ' on' : ''}">
                        ${k
                            ? `<img src="${P[k]}" alt="${n}" data-z="${k}">`
                            : `<div class="n">${n}</div>`}
                        <div class="b">
                            <strong>${k ? n : 'Add ' + n}</strong>
                            <button data-n="${n.replace(/"/g, '')}" aria-label="${sel.has(n) ? 'Remove' : 'Add'} ${n}">${sel.has(n) ? '×' : '+'}</button>
                        </div>
                    </div>`;
                }
            }
        }
    }
    $('#grid').innerHTML = h || '<p>Nothing matches that search. Try a different word.</p>';
    bar();
}

// Order bar at the bottom
function bar() {
    const n = sel.size;
    $('#bar').classList.toggle('s', n > 0);
    $('#cnt').textContent = n + (n == 1 ? ' item' : ' items') + ' selected';
    $('#send').href = link(
        'Hello Unique Choice Kitchen, I would like to order:\n' +
        [...sel].map(x => '- ' + x).join('\n') +
        '\n\nPlease confirm the price and delivery.'
    );
}

$('#tabs').onclick = e => {
    if (e.target.dataset.c) {
        cat = e.target.dataset.c;
        tabs();
        grid();
    }
};

$('#q').oninput = grid;

$('#clr').onclick = () => {
    sel.clear();
    grid();
};

$('#grid').onclick = e => {
    const n = e.target.dataset.n;
    if (n) {
        sel.has(n) ? sel.delete(n) : sel.add(n);
        grid();
    } else if (e.target.dataset.z) {
        open_([e.target.dataset.z], 0);
    }
};

// Gallery photos: [photo key, description]
const G = [
    ['dine', 'Dining area'],
    ['crab', 'Crab and seafood soup'],
    ['friedfish', 'Fried rice with fish and shrimp'],
    ['basket', 'Packed meals and drinks'],
    ['okro2', 'Okro soup'],
    ['snacks', 'Small chops'],
    ['bar', 'Bar and ice cream'],
    ['wings', 'Peppered wings'],
    ['pack', 'Branded takeaway pack'],
    ['counter', 'Hot food counter'],
    ['shrimp', 'Shrimp fried rice'],
    ['yellow', 'Yellow rice with turkey'],
    ['jollof', 'Jollof rice with fish and plantain'],
    ['doughnut', 'Pies and doughnuts'],
    ['van', 'Our delivery van'],
    ['sign', 'Our signboard']
];

$('#ga').innerHTML = G
    .map((g, i) => `<img src="${P[g[0]]}" alt="${g[1]}" data-i="${i}" loading="lazy">`)
    .join('');

// Photo viewer (lightbox)
let L = [];
let ix = 0;

function open_(a, i) {
    L = a;
    ix = i;
    sh();
}

function sh() {
    $('#lb img').src = P[L[ix]];
    $('#lb').classList.add('s');
}

$('#ga').onclick = e => {
    if (e.target.dataset.i) {
        open_(G.map(g => g[0]), +e.target.dataset.i);
    }
};

$('#lb .c').onclick = () => $('#lb').classList.remove('s');

$('#lb .p').onclick = () => {
    ix = (ix + L.length - 1) % L.length;
    sh();
};

$('#lb .nx').onclick = () => {
    ix = (ix + 1) % L.length;
    sh();
};

$('#lb').onclick = e => {
    if (e.target.id == 'lb') $('#lb').classList.remove('s');
};

document.onkeydown = e => {
    if (!$('#lb').classList.contains('s')) return;
    if (e.key == 'Escape') $('#lb .c').click();
    if (e.key == 'ArrowLeft') $('#lb .p').click();
    if (e.key == 'ArrowRight') $('#lb .nx').click();
};

// Start the page
tabs();
grid();
