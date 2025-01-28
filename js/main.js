// 创建地图
var map = L.map('map').setView([47.8095, 13.0550], 13); // 设置萨尔茨堡的坐标和缩放级别

// 使用OpenStreetMap作为底图
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// 添加标题控件
var titleControl = L.control({ position: 'topright' });

titleControl.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'map-title');
    div.innerHTML = '<h2 style="margin: 0; padding: 10px; background: white; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2); font-size: 35px; font-weight: bold; text-align: center;">Riding in Salzburg</h2>';
    return div;
};

titleControl.addTo(map);

// 自定义路线数据
var routes = [
    {
        name: "Wallersee loop",
        distance: "18.8 km",
        time: "1h22mins",
        uphill: "190 m",
        imageUrl: "css/images/route1.webp",  // 路线1的图片路径
        gpxFile: "data/route1.gpx"  // 路线1的 GPX 文件
    },
    {
        name: "Von Grödig in die Salzburger Altstadt",
        distance: "23.9 km",
        time: "1h46mins",
        uphill: "70 m",
        imageUrl: "css/images/route2.webp",  // 路线2的图片路径
        gpxFile: "data/route2.gpx"  // 路线2的 GPX 文件
    },
    // 可以继续添加更多路线
    {
        name: "Ausflugsrunde von Elsbethen zur Festung Hohensalzburg",
        distance: "15.2 km",
        time: "1h20mins",
        uphill: "110 m",
        imageUrl: "css/images/3.webp",
        gpxFile: "data/3.gpx"
    },
    {
        name: "Mondsee loop from Wengl",
        distance: "38.3 km",
        time: "2h39mins",
        uphill: "460 m",
        imageUrl: "css/images/4.webp",
        gpxFile: "data/4.webp"
    },
    {
        name: "Trumer-Seen-Runde",
        distance: "27.3 km",
        time: "1h46mins",
        uphill: "230 m",
        imageUrl: "data/5.webp",
        gpxFile: "data/5.gpx"
    },
    {
        name: "Tour to the Salzburg local mountain",
        distance: "29.8 km",
        time: "1h53mins",
        uphill: "110 m",
        imageUrl: "data/6.webp",
        gpxFile: "data/6.gpx"
    },
    {
        name: "Bike tour from Aigen to the Gaisberg",
        distance: "27.0 km",
        time: "2h36mins",
        uphill: "980 m",
        imageUrl: "data/7.webp",
        gpxFile: "data/7.gpx"
    },
    {
        name: " Tour to the Antheringer Au",
        distance: "24.9 km",
        time: "1h33mins",
        uphill: "90 m",
        imageUrl: "data/8.webp",
        gpxFile: "data/8.gpx"
    },
    {
        name: " Auf der Ischlerbahntrasse von Eugendorf in die Stadt Salzburg",
        distance: "28.1 km",
        time: "1h59mins",
        uphill: "180 m",
        imageUrl: "data/9.webp",
        gpxFile: "data/9.gpx"
    },
    {
        name: " Blick auf die Salzach loop from Salzburg Aigen",
        distance: "27.7 km",
        time: "1h44mins",
        uphill: "80 m",
        imageUrl: "data/10.webp",
        gpxFile: "data/10.gpx"
    },
    {
        name: " Mondsee loop from Wengl",
        distance: "38.3 km",
        time: "2h39mins",
        uphill: "460 m",
        imageUrl: "data/11.webp",
        gpxFile: "data/11.gpx"
    },
    {
        name: " Lake Fuschl loop from Fuschl am See",
        distance: "15.8 km",
        time: "1h05mins",
        uphill: "290 m",
        imageUrl: "data/12.webp",
        gpxFile: "data/12.gpx"
    },
    {
        name: " View of St. Wolfgang",
        distance: "46.9 km",
        time: "3h13mins",
        uphill: "570 m",
        imageUrl: "data/13.webp",
        gpxFile: "data/13.gpx"
    },
    {
        name: " Railroad embankment cycle path Wolfgangsee",
        distance: "36.3 km",
        time: "2h24mins",
        uphill: "270 m",
        imageUrl: "data/14.webp",
        gpxFile: "data/14.gpx"
    },
    {
        name: " Panoramic view of the Mondsee",
        distance: "37.6 km",
        time: "3h19mins",
        uphill: "940 m",
        imageUrl: "data/15.webp",
        gpxFile: "data/15.gpx"
    },
    {
        name: " Wunderschöner Hintersee",
        distance: "20.0 km",
        time: "1h56mins",
        uphill: "380 m",
        imageUrl: "data/16.webp",
        gpxFile: "data/16.gpx"
    },
    {
        name: " Beautiful tunnel and view",
        distance: "37.1 km",
        time: "2h25mins",
        uphill: "460 m",
        imageUrl: "data/17.webp",
        gpxFile: "data/17.gpx"
    },
    {
        name: " Wiestal reservoir",
        distance: "42.3 km",
        time: "3h38mins",
        uphill: "980 m",
        imageUrl: "data/18.webp",
        gpxFile: "data/18.gpx"
    },
    {
        name: " View of the Untersberg",
        distance: "25.9 km",
        time: "1h41mins",
        uphill: "240 m",
        imageUrl: "data/19.webp",
        gpxFile: "data/19.gpx"
    },
    {
        name: " Eugendorf to Mondsee and Irrsee lakes",
        distance: "81.6 km",
        time: "5h15mins",
        uphill: "710 m",
        imageUrl: "data/20.webp",
        gpxFile: "data/20.gpx"
    },
];
// 上一次生成的颜色，用于比较颜色差异
var lastColor = null;

// 随机颜色生成器（避开绿色系并确保差异）
function getRandomColor() {
    var maxAttempts = 10; // 尝试生成颜色的最大次数
    for (var attempt = 0; attempt < maxAttempts; attempt++) {
        // 生成 RGB 颜色，限制绿色分量在较低范围（避免绿色系）
        var r = Math.floor(Math.random() * 256); // 红色通道
        var g = Math.floor(Math.random() * 100); // 限制绿色通道
        var b = Math.floor(Math.random() * 256); // 蓝色通道

        var color = `rgb(${r},${g},${b})`;

        // 如果没有上一条颜色，直接返回
        if (!lastColor) {
            lastColor = color;
            return color;
        }

        // 计算颜色差异
        var colorDiff = getColorDifference(lastColor, color);

        // 如果颜色差异足够大，返回这个颜色
        if (colorDiff > 150) {
            lastColor = color;
            return color;
        }
    }

    // 如果尝试多次仍无法找到足够差异的颜色，默认返回黑色
    return 'rgb(0,0,0)';
}

// 计算两个颜色的差异（基于 RGB）
function getColorDifference(color1, color2) {
    var rgb1 = color1.match(/\d+/g).map(Number);
    var rgb2 = color2.match(/\d+/g).map(Number);

    // 使用欧几里得距离计算颜色差异
    var diff = Math.sqrt(
        Math.pow(rgb1[0] - rgb2[0], 2) +
        Math.pow(rgb1[1] - rgb2[1], 2) +
        Math.pow(rgb1[2] - rgb2[2], 2)
    );
    return diff;
}

// 为每条路线随机分配颜色
routes.forEach(function(route) {
    route.color = getRandomColor(); // 动态生成并分配随机颜色
});

// 加载每条路线的 GPX 数据
routes.forEach(function(route) {
    var gpxLayer = new L.GPX(route.gpxFile, {
        async: true,
        marker_options: {
            startIconUrl: 'css/images/bike.png',
            endIconUrl: 'css/images/bike.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
        }
    }).on('loaded', function(e) {
        route.layer = gpxLayer; // 确保 GPX 图层被分配
        map.fitBounds(e.target.getBounds()); // 自动调整视图以适应路线
    }).addTo(map);

    // 鼠标悬停时高亮路线
    gpxLayer.on('mouseover', function(e) {
        var layer = e.target;
        layer.setStyle({ color: 'red', weight: 6 }); // 设置高亮样式
    });

    // 鼠标移开时恢复路线样式
    gpxLayer.on('mouseout', function(e) {
        var layer = e.target;
        layer.setStyle({ color: route.color, weight: 4 }); // 恢复默认样式
    });

    // 添加自定义的 pop-up 事件
    gpxLayer.on('click', function(e) {
        // 获取当前路线的信息
        var popupContent = `
            <div style="text-align: center;">
                <img src="${route.imageUrl}" alt="Route Image" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 10px;">
                <h3>${route.name}</h3>
                <p><strong>Distance:</strong> ${route.distance}</p>
                <p><strong>Time:</strong> ${route.time}</p>
                <p><strong>Uphill:</strong> ${route.uphill}</p>
            </div>
        `;

        // 绑定自定义的 pop-up 内容到 GPX 路线
        e.target.bindPopup(popupContent).openPopup();
    });
});
// 添加搜索控件
var searchControl = L.control({ position: 'topright' });

searchControl.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'search-control');
    div.innerHTML = `
        <div style="margin: 10px; padding: 10px; background: white; border-radius: 8px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);">
            <input id="routeSearch" type="text" placeholder="Search for a route..." 
                   style="width: 200px; padding: 5px; border-radius: 4px; border: 1px solid #ccc;">
            <button id="searchButton" style="padding: 5px 10px; margin-left: 5px; border: none; background: #007bff; color: white; border-radius: 4px; cursor: pointer;">
                Search
            </button>
        </div>
    `;
    return div;
};

searchControl.addTo(map);

document.getElementById('searchButton').addEventListener('click', function() {
    var searchValue = document.getElementById('routeSearch').value.toLowerCase();

    // 查找匹配的路线
    var found = false;
    routes.forEach(function(route) {
        if (route.name.toLowerCase().includes(searchValue)) {
            if (route.layer) {
                found = true;

                // 放大并居中到路线
                map.fitBounds(route.layer.getBounds());

                // 打开弹窗 - 确保弹窗位置正确
                var bounds = route.layer.getBounds();
                var center = bounds.getCenter(); // 获取路线的中心点
                route.layer.openPopup(center); // 在中心点打开弹窗
            } else {
                alert(`Route "${route.name}" is still loading. Please try again later.`);
            }
        }
    });

    if (!found) {
        alert('No matching route found!');
    }
});
