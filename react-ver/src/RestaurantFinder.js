// JavaScript doesn't have random.sample
function randomSample(arr, k) {
    var selected = {};
    var ans = [];
    var n = arr.length;
    if (k > n) return arr;
    for (var i = 0; i < k; i++) {
        do {
            var r = Math.floor(Math.random() * n);
        } while (r in selected) ;
        ans.push(arr[r]);
        selected[r] = 1;
    }
    return ans;
}

export async function getRestaurantList() {
    var res = await fetch(process.env.PUBLIC_URL + '/restaurant.tsv');
    if (res.status < 200 || res.status > 299) {
        throw new Error('伺服器出錯了！');
    }
    var text = await res.text();
    var lines = text.split(/\r?\n/);
    var header = lines[0].split('\t');
    var rows = [];
    for (var i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        var col = lines[i].split('\t');
        var dat = {};
        for (var j = 0; j < header.length; j++) {
            dat[header[j]] = col[j];
        }
        rows.push(dat);
    }
    return rows;
}

export class RestaurantFinder {
    constructor(restaurants) {
        this.restaurants = restaurants;
    }

    search(places) {
        var ans = [];
        this.restaurants.forEach(r => {
            if (!places.includes(r.place)) return;
            ans.push(r);
        });
        ans = randomSample(ans, Math.min(10, ans.length));
        return ans.map(r => ({id: r.id, name: r.name}));
    }
}
