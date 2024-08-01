
const viewer = new Cesium.Viewer("cesiumContainer", {
    animation: false, // Disable animation widget
    timeline: false, // Disable timeline widget
    creditContainer: document.createElement("div"), // Optional: Hide credits
    geocoder: false, // Optional: Disable geocoder
    shouldAnimate: false, // Optional: Enable globe animation
    infoBox: false,
    shadows: true,
    selectionIndicator: false,

})
var viewer1 = new Cesium.Viewer('cesiumContainer1', {
    animation: false, // Disable animation widget
    timeline: false, // Disable timeline widget
    creditContainer: document.createElement("div"), // Optional: Hide credits
    geocoder: false, // Optional: Disable geocoder
    shouldAnimate: false, // Optional: Enable globe animation
    infoBox: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false,
    skyAtmosphere: false,
    fullscreenButton: true,
    scene3DOnly: true,
    selectionIndicator: false,
    shadows: true,
});

var model;
var stairCase;
var point;
let animations;
var position = Cesium.Cartesian3.fromDegrees(
    78.571030, 17.473419,
    // 78.564925, 30.865393,
    0
);


let unitData = {
    "type": "FeatureCollection",
    "name": "ECIL_Road",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "FID_1": 0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.585109862868194, 17.497665749760642], [78.585530078865133, 17.491344693211147], [78.58674195690412, 17.490461363387283], [78.588997555959054, 17.485845503435939], [78.58893867150033, 17.483552113186192], [78.586657764032054, 17.478763046707854], [78.584717512669272, 17.479427025167638], [78.578790074739857, 17.480346014246209], [78.57630181006374, 17.481264312646204], [78.575605689346389, 17.481151296348571], [78.571090973015487, 17.473386161552412], [78.570912896974107, 17.473378836407107], [78.570841484531911, 17.473381133068642], [78.569607375402541, 17.473677985958659], [78.569070190416483, 17.473913708731175], [78.56871534909817, 17.474108326995065], [78.567979053361967, 17.475056030348185], [78.567216144524707, 17.476460653027004], [78.566861303206451, 17.476545268504822], [78.564217729637505, 17.476790654977208], [78.563499175967593, 17.477002193214787], [78.563392723571724, 17.477061423876421], [78.563853009316517, 17.480673409113535], [78.564227007245336, 17.481977612426022], [78.564954431949957, 17.483441410257228], [78.56609607527173, 17.485424641860504], [78.566584028566751, 17.487235412111602], [78.566992096082174, 17.487895372705111], [78.568571139952041, 17.488876848131781], [78.569706632172313, 17.489333740057987], [78.570664708472009, 17.489409890385673], [78.571267938714641, 17.489579109255828], [78.573157468737236, 17.490822863116307], [78.574867443429923, 17.492048523231404], [78.576499713496958, 17.493046897798024], [78.577839942674359, 17.494046384293938], [78.578931079730637, 17.495247804219446], [78.580338196984428, 17.496852107336792], [78.581101105819926, 17.497537414730914], [78.585109862868194, 17.497665749760642]], [[78.570939630907787, 17.473614153526], [78.571085998459807, 17.473679156377784], [78.575581900726263, 17.481479258331319], [78.576279997483766, 17.481609534171014], [78.578556399950969, 17.48068312617022], [78.584849322054367, 17.479642150033612], [78.586518683863176, 17.479077614614482], [78.58867262700204, 17.483559937112375], [78.588702280522739, 17.4857491216369], [78.586670115827019, 17.490242309505959], [78.585303497168809, 17.491232720520145], [78.584894015763552, 17.497497656507562], [78.583477892572034, 17.497465111943711], [78.581028977090796, 17.497296984004379], [78.579947227047114, 17.496225292839085], [78.577993370482091, 17.493945933154578], [78.576151662660777, 17.49264628391694], [78.574877043785079, 17.491886485572877], [78.57402949841503, 17.491180813986489], [78.572450832269851, 17.490138012239811], [78.571746958877554, 17.489636486180245], [78.570899053386313, 17.489290656796072], [78.570514148919472, 17.489242772675766], [78.569833593195881, 17.489194888543011], [78.569242623265268, 17.489000778595539], [78.568113759535663, 17.488456455406151], [78.567627258014625, 17.488098855130204], [78.567126832456552, 17.487754141326036], [78.566844184687227, 17.487329877285731], [78.566679838517814, 17.486969133875164], [78.566336515764135, 17.485638838192131], [78.566121939043285, 17.485127183415102], [78.56540311098189, 17.483837812194793], [78.564941771031442, 17.483141954456414], [78.56435203759338, 17.481943201031356], [78.563976528330727, 17.48074590227202], [78.563844448437408, 17.479387789891064], [78.563608414044154, 17.477279690525279], [78.564219957700004, 17.476972683725364], [78.564767128338417, 17.476931749446635], [78.56568893296037, 17.476897911579726], [78.567137325826991, 17.476713707176543], [78.567394817892932, 17.476549969772122], [78.567663038795104, 17.476099691149898], [78.567888344352241, 17.475659645056624], [78.568210209433516, 17.475045625473911], [78.568521345370414, 17.474615808242504], [78.568961227648401, 17.474155291108048], [78.56947621178, 17.473950616452498], [78.570280874484467, 17.473766409065036], [78.570939630907787, 17.473614153526]]]] } }
    ]
}
const unitLayerpromise = Cesium.GeoJsonDataSource.load(
    unitData
);
unitLayerpromise
    .then(function (dataSource) {
        viewer.dataSources.add(dataSource);
        const entities = dataSource.entities.values;
        console.log(entities)
        entities.forEach(entity => {
            if (entity.polygon) {
                entity.title = "Unit Layer"
                const color = Cesium.Color.fromCssColorString("#000000");
                const lineColor = Cesium.Color.YELLOW;
                let finalColor = color.clone();
                entity.polygon.material = new Cesium.ColorMaterialProperty(finalColor);
                entity.polygon.outline = true;
                entity.polygon.outlineWidth = 10;
                entity.polygon.editable = true;
                entity.polygon.extrudedHeight = 0.1
                const positions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                // viewer.entities.add({
                //     polyline: {
                //         positions: positions.concat(positions[0]),
                //         width: 10,
                //         material: lineColor,
                //         // clampToGround: true
                //     }
                // }); 
            }
        })
    })


let controller

controller = new CesiumRoleController(Cesium, viewer)


document.addEventListener('keydown', function (e) {
    if (e.key === 'Shift') {
        console.log('Shift key pressed');
        controller.speed = 2
        // controller.rolePrimitive.activeAnimations.add({
        //     name: "run",
        //     loop: Cesium.ModelAnimationLoop.REPEAT
        // })
        // Your code for shift key press
    }
    // if (e.key === ' ' || e.keyCode === 32) {
    //     controller.rolePrimitive.activeAnimations.add({
    //         name: "runJump",
    //         loop: Cesium.ModelAnimationLoop.REPEAT
    //     })
    // }
});

document.addEventListener('keyup', function (e) {
    if (e.key === 'Shift') {
        controller.speed = 1
        // controller.rolePrimitive.activeAnimations.add({
        //     name: "walk",
        //     loop: Cesium.ModelAnimationLoop.REPEAT
        // })
        // Your code for shift key release
    }
    // if (e.key === ' ' || e.keyCode === 32) {
    //     controller.rolePrimitive.activeAnimations.add({
    //         name: "run",
    //         loop: Cesium.ModelAnimationLoop.REPEAT
    //     })
    // }
});
var ref;
var a = 0;
var user;
$("#start").click(function () {
    if ($("#username").val().length > 0) {
        user=$("#username").val();
        ref = firebase.database().ref("GameData" + user)
    } else {
        user="Test";
        ref = firebase.database().ref("GameData"+user)
    }
    viewer.scene.globe.depthTestAgainstTerrain = true;
    viewer.scene.highDynamicRange = true
    viewer.scene.globe.enableLighting = false; // Enable lighting for the globe
    viewer.scene.globe.lightingDirection = new Cesium.Cartesian3(-0.5, 0.5, -0.5); // Direction of the light
    viewer.scene.globe.lightingIntensity = 2.0; // Increase the lighting intensity
    viewer.scene.globe.ambientLightColor = Cesium.Color.RED; // Adjust the color
    viewer.scene.postProcessStages.bloom.enabled = false;
    viewer.scene.postProcessStages.bloom.threshold = 0.8; // Adjust threshold value
    viewer.scene.postProcessStages.bloom.bloomIntensity = 2.0; // Adjust intensity value
    checkRun()
});
function checkRun() { 
    ref.on("value", function (snapshot) {
        if (a == 0) {
            a++;  
            controller.init({
                position: snapshot.val().cords,
                orientation: snapshot.val().orientation,
                url: "/Modal/carCenter.glb",
                animation: undefined,
                lockViewLevel: 3,
                pitch: -10,
                speed: 1,
                range: 2.0
            })
        } else {

        }
    });
}


viewer.scene.globe.depthTestAgainstTerrain = true;
viewer.scene.highDynamicRange = true
viewer.scene.globe.enableLighting = false; // Enable lighting for the globe
viewer.scene.globe.lightingDirection = new Cesium.Cartesian3(-0.5, 0.5, -0.5); // Direction of the light
viewer.scene.globe.lightingIntensity = 2.0; // Increase the lighting intensity
viewer.scene.globe.ambientLightColor = Cesium.Color.RED; // Adjust the color
viewer.scene.postProcessStages.bloom.enabled = false;
viewer.scene.postProcessStages.bloom.threshold = 0.8; // Adjust threshold value
viewer.scene.postProcessStages.bloom.bloomIntensity = 2.0; // Adjust intensity value

// const targetPosition = Cesium.Cartesian3.fromDegrees(78.571030, 17.473419, 1000);
// Define the position and orientation  
const heading = Cesium.Math.toRadians(0);
const pitch = Cesium.Math.toRadians(0);
const roll = Cesium.Math.toRadians(0);
let headingPitchRoll = new Cesium.HeadingPitchRoll(heading, pitch, roll);





class gisFunctions {
    constructor() {
    }
    calculateDistance(centerlon, centerlat, endlon, endlat) {
        var lat1 = parseFloat(centerlat),
            lon1 = parseFloat(centerlon),
            lat2 = parseFloat(endlat),
            lon2 = parseFloat(endlon);
        var radius = 6371e3; // meters 6371e3
        var dLon = (lon2 - lon1) * Math.PI / 180,
            lat1 = (lat1 * Math.PI / 180),
            lat2 = (lat2 * Math.PI / 180),
            distance = Math.acos(Math.sin(lat1) * Math.sin(lat2) +
                Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon)) * radius;
        return distance;
    }
    createCoord(coord, bearing, distance) {
        var radius = 6371e3, // meters
            δ = distance / radius, // angular distance in radians
            θ = bearing * Math.PI / 180;
        var φ1 = (coord[1] * Math.PI / 180);
        var λ1 = (coord[0] * Math.PI / 180);
        var φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
        var λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));
        λ2 = (λ2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
        return [(λ2 * 180 / Math.PI), (φ2 * 180 / Math.PI)];
    }
    createBackCoord(coord, bearing, distance) {
        var radius = 6371e3, // meters
            δ = distance / radius, // angular distance in radians
            θ = (bearing + 180) * Math.PI / 180;
        var φ1 = (coord[1] * Math.PI / 180);
        var λ1 = (coord[0] * Math.PI / 180);
        var φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
        var λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));
        λ2 = (λ2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
        return [(λ2 * 180 / Math.PI), (φ2 * 180 / Math.PI)];
    }

    getBearing(centerlon, centerlat, endlon, endlat) {
        var
            startLat = (centerlat) * Math.PI / 180,
            startLong = (centerlon) * Math.PI / 180,
            endLat = (endlat) * Math.PI / 180,
            endLong = (endlon) * Math.PI / 180,
            dLong = endLong - startLong;
        var dPhi = Math.log(Math.tan(endLat / 2.0 + Math.PI / 4.0) /
            Math.tan(startLat / 2.0 + Math.PI / 4.0));

        if (Math.abs(dLong) > Math.PI) {
            dLong = (dLong > 0.0) ? -(2.0 * Math.PI - dLong) : (2.0 * Math.PI + dLong);
        }
        return ((Math.atan2(dLong, dPhi) * 180 / Math.PI) + 360.0) % 360.0;
    }

    isPointInPoly(vs, point) {
        var x = point[0], y = point[1];

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        if (inside == true) {
            return inside;
        }
    }
}


// Function to compute the angle
function computeAngle() {
    // Ensure the model matrix is available
    if (!stairCase.model.modelMatrix) {
        console.error('Model matrix is not available yet.');
        return;
    }

    var modelMatrix = stairCase.modelMatrix;

    // Define the up vector of the model in model space (typically y-axis)
    var modelUpVector = new Cesium.Cartesian3(0, 1, 0);

    // Transform the model up vector to world coordinates
    var transformedUpVector = Cesium.Matrix4.multiplyByVector(modelMatrix, modelUpVector, new Cesium.Cartesian3());

    // Ground normal vector (assuming flat horizontal ground)
    var groundNormal = new Cesium.Cartesian3(0, 0, 1);

    // Compute the dot product
    var dotProduct = Cesium.Cartesian3.dot(transformedUpVector, groundNormal);

    // Compute magnitudes
    var magnitudeUp = Cesium.Cartesian3.magnitude(transformedUpVector);
    var magnitudeGround = Cesium.Cartesian3.magnitude(groundNormal);

    // Check if magnitudes are non-zero to avoid division by zero
    if (magnitudeUp === 0 || magnitudeGround === 0) {
        console.error('One of the vectors has zero magnitude.');
        return;
    }

    // Compute the angle in radians
    var cosTheta = dotProduct / (magnitudeUp * magnitudeGround);
    var angleRadians = Math.acos(Math.min(Math.max(cosTheta, -1), 1)); // Clamp value between -1 and 1 to avoid NaN

    // Convert to degrees if needed
    var angleDegrees = Cesium.Math.toDegrees(angleRadians);

    // Log the angle
    console.log('Angle between the staircase and the ground: ', angleDegrees, 'degrees');
}


function interpolateLatLongs(position1, position2, intervalInFeet) {
    var cartographic1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position1);
    var cartographic2 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position2);

    var lat1 = cartographic1.latitude;
    var lon1 = cartographic1.longitude;
    var height1 = cartographic1.height;
    var lat2 = cartographic2.latitude;
    var lon2 = cartographic2.longitude;
    var height2 = cartographic2.height;

    // Calculate the distance in meters
    var geodesic = new Cesium.EllipsoidGeodesic(cartographic1, cartographic2);
    var distanceInMeters = geodesic.surfaceDistance;
    console.log(distanceInMeters);
    // Convert the distance to feet (1 meter = 3.28084 feet)
    var distanceInFeet = distanceInMeters * 3.28084;

    // Number of points to interpolate
    var numberOfPoints = Math.floor(distanceInFeet / intervalInFeet);
    //console.log(numberOfPoints);
    // Array to hold the interpolated points
    var interpolatedPoints = [];

    for (var i = 0; i <= numberOfPoints; i++) {
        var fraction = i / numberOfPoints;

        var interpolatedLat = Cesium.Math.lerp(lat1, lat2, fraction);
        var interpolatedLon = Cesium.Math.lerp(lon1, lon2, fraction);
        var interpolatedHeight = Cesium.Math.lerp(height1, height2, fraction);
        if (interpolatedLat) {

            interpolatedPoints.push({
                latitude: Cesium.Math.toDegrees(interpolatedLat),
                longitude: Cesium.Math.toDegrees(interpolatedLon),
                height: interpolatedHeight
            });
        }
    }

    return interpolatedPoints;
}



