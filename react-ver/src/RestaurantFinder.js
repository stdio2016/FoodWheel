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

function intersect(arr1, arr2) {
    return arr1.filter(x => arr2.includes(x));
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

    search(places, whatToEat, requirements) {
        var ans = [];
        var meats = ['雞', '豬', '牛'].filter(x => whatToEat.includes(x));
        if (meats.length === 0) {
            meats = ['雞', '豬', '牛'].filter(x => !requirements.includes('不吃' + x));
        }
        var rice = ['飯', '麵', '水餃'].filter(x => whatToEat.includes(x));
        var chinese = ['中式', '西式', '日式'].filter(x => whatToEat.includes(x));
        console.log(rice, chinese);
        this.restaurants.forEach(r => {
            if (!places.includes(r.place)) return;
            var types = r.type.split('/');
            if (intersect(meats, types).length === 0) {
                return;
            }
            if (rice.length > 0 && intersect(rice, types).length === 0) {
                return;
            }
            if (chinese.length > 0 && intersect(chinese, types).length === 0) {
                return;
            }
            ans.push(r);
        });
        ans = randomSample(ans, Math.min(10, ans.length));
        return ans.map(r => ({id: r.id, name: r.name}));
    }
}
