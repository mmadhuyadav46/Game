
// const viewer = new Cesium.Viewer("cesiumContainer")

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
var point;
// let animations;
var position = Cesium.Cartesian3.fromDegrees(
    78.571030, 17.473419,
    // 78.564925, 30.865393,
    0
);
var user;
$("#start").click(function () {
    var ref;
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

    // const targetPosition = Cesium.Cartesian3.fromDegrees(78.571030, 17.473419, 1000);
    // Define the position and orientation  
    const heading = Cesium.Math.toRadians(0);
    const pitch = Cesium.Math.toRadians(0);
    const roll = Cesium.Math.toRadians(0);
    let headingPitchRoll = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    dd();
    async function dd() {


        // Position a model with modelMatrix and display it with a minimum size of 128 pixels

        try {
            model = viewer.entities.add({
                position: position,
                orientation: Cesium.Transforms.headingPitchRollQuaternion(position, headingPitchRoll),
                model: {
                    uri: "/resources/Models/carCenter.glb",
                    // minimumPixelSize: 128, 
                    // maximumScale: 200,
                    scale: 2,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                },
                label: {
                    show: true,
                    text: user,
                    font: "bold 14px sans-serif",
                    showBackground: true,
                    backgroundColor: Cesium.Color.BLACK,
                    scale: 1.0,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    fillColor: Cesium.Color.RED,
                    outlineWidth: 10,
                    outlineColor: Cesium.Color.BLACK,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    pixelOffset: new Cesium.Cartesian2(0, 10),
                    eyeOffset: new Cesium.Cartesian3(0, -5, 0),
                },
            });
            point = viewer1.entities.add({
                position: position,
                point: {
                    pixelSize: 10,
                    color: Cesium.Color.BLUE,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                },
                label: {
                    show: true,
                    text: 'Me',
                    font: "bold 14px sans-serif",
                    showBackground: true,
                    scale: 1.0,
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    fillColor: Cesium.Color.BLUE,
                    outlineWidth: 10,
                    outlineColor: Cesium.Color.BLACK,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    pixelOffset: new Cesium.Cartesian2(0, 15),
                    eyeOffset: new Cesium.Cartesian3(0, -5, 0),
                },
            }) 
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(
                    78.571485, 17.473760, 
                    1.5
                ), 
                model: {
                    uri: "/resources/Models/building2.glb",
                    // minimumPixelSize: 128, 
                    // maximumScale: 200,
                    scale: 1, 
                }, 
            }); 
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(
                     78.571255, 17.474065,
                    1.5
                ), 
                model: {
                    uri: "/resources/Models/building1.glb",
                    // minimumPixelSize: 128, 
                    // maximumScale: 200,
                    scale: 1, 
                }, 
            }); 
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(
                     78.571587,17.474478,
                    1.5
                ), 
                model: {
                    uri: "/resources/Models/building1.glb",
                    // minimumPixelSize: 128, 
                    // maximumScale: 200,
                    scale: 1, 
                }, 
            });
            viewer1.zoomTo(point);
            // viewer.trackedEntity = model;
        } catch (error) {
            console.log(`Failed to load model. ${error}`);
        }

        // var tilesetLayerOfficeBIM = 'http://202.53.11.74/3DBuildings/portal/Tiles_BIM/tileset.json';
        // var ALLtileset_BIM = await Cesium.Cesium3DTileset.fromUrl(
        //     tilesetLayerOfficeBIM,
        //     { enableCollision: true }
        // );
        // // var ALLtileset_BIM = new Cesium.Cesium3DTileset({
        // //     url: tilesetLayerOfficeBIM,
        // //     show: true,
        // // });
        // viewer.scene.primitives.add(ALLtileset_BIM);

        // setTimeout(() => {
        //     // viewer.flyTo(ALLtileset_BIM);
        // }, 5000);
    }

    let modelAngle = 0;
    // Event listener for arrow key presses
    var keys = [];
    var allowkeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    document.addEventListener('keydown', function (event) {
        if (!keys.includes(event.key)) {
            if (allowkeys.includes(event.key)) {
                keys.push(event.key);
            }
        }
        // console.log("asd",keys)
        glbMove(event.key);
    });
    document.addEventListener('keyup', function (event) {
        if (keys.includes(event.key)) {
            const index = keys.indexOf(event.key);
            if (index > -1) {
                keys.splice(index, 1);
            }
        }
    });


    let moveAmount = 0.33;
    function glbMove(key) {
        if (!model) return;
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            switch (key) {
                case 'ArrowLeft':
                    moveAmount = 0.33;
                    $("#speed").text(moveAmount + " km/h");

                    // model.modelMatrix = Cesium.Matrix4.multiplyByTranslation(model.modelMatrix, new Cesium.Cartesian3(0.0, -moveAmount, 0.0), new Cesium.Matrix4());
                    headingPitchRoll.heading += Cesium.Math.toRadians(-1);
                    model.orientation = Cesium.Transforms.headingPitchRollQuaternion(position, headingPitchRoll);
                    var cartographic = Cesium.Cartographic.fromCartesian(position);

                    viewer.camera.lookAt(
                        Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 2),
                        // targetPosition,
                        new Cesium.HeadingPitchRange(headingPitchRoll.heading, Cesium.Math.toRadians(0), 10)
                    );
                    var lon = Cesium.Math.toDegrees(cartographic.longitude);
                    var lat = Cesium.Math.toDegrees(cartographic.latitude);

                    var newLatling = new gisFunctions().createCoord([lon, lat], Cesium.Math.toDegrees(headingPitchRoll.heading), moveAmount)
                    var aa = new gisFunctions().createBackCoord([lon, lat], Cesium.Math.toDegrees(headingPitchRoll.heading), 800);
                    viewer1.camera.lookAt(
                        Cesium.Cartesian3.fromDegrees(aa[0], aa[1], 1000),
                        // targetPosition,
                        new Cesium.HeadingPitchRange(headingPitchRoll.heading, Cesium.Math.toRadians(-50), Cesium.Math.toRadians(1))
                    );
                    let objl = {
                        userName: user,
                        cords: [lon, lat],
                        glbPath: "pickup van.glb",
                        orientation: Cesium.Transforms.headingPitchRollQuaternion(position, headingPitchRoll),
                        isOnline: true
                    }
                    ref.set(objl)
                    break;
                case 'ArrowRight':
                    moveAmount = 0.33;
                    $("#speed").text(moveAmount + " km/h");
                    headingPitchRoll.heading += Cesium.Math.toRadians(1);
                    model.orientation = Cesium.Transforms.headingPitchRollQuaternion(position, headingPitchRoll);

                    var cartographic = Cesium.Cartographic.fromCartesian(position);

                    viewer.camera.lookAt(
                        Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 2),
                        // targetPosition,
                        new Cesium.HeadingPitchRange(headingPitchRoll.heading, Cesium.Math.toRadians(0), 10)
                    );
                    var lon = Cesium.Math.toDegrees(cartographic.longitude);
                    var lat = Cesium.Math.toDegrees(cartographic.latitude);

                    var newLatling = new gisFunctions().createCoord([lon, lat], Cesium.Math.toDegrees(headingPitchRoll.heading), moveAmount)
                    var aa = new gisFunctions().createBackCoord([lon, lat], Cesium.Math.toDegrees(headingPitchRoll.heading), 800);
                    viewer1.camera.lookAt(
                        Cesium.Cartesian3.fromDegrees(aa[0], aa[1], 1000),
                        // targetPosition,
                        new Cesium.HeadingPitchRange(headingPitchRoll.heading, Cesium.Math.toRadians(-50), Cesium.Math.toRadians(1))
                    );
                    let objr = {
                        userName: user,
                        cords: [lon, lat],
                        glbPath: "pickup van.glb",
                        orientation: Cesium.Transforms.headingPitchRollQuaternion(position, headingPitchRoll),
                        isOnline: true
                    }
                    ref.set(objr)
                    break;
                case 'ArrowUp':
                    var cartographic = Cesium.Cartographic.fromCartesian(position);

                    var lon = Cesium.Math.toDegrees(cartographic.longitude);
                    var lat = Cesium.Math.toDegrees(cartographic.latitude);

                    var newLatling = new gisFunctions().createCoord([lon, lat], Cesium.Math.toDegrees(headingPitchRoll.heading), moveAmount)
                    position = Cesium.Cartesian3.fromDegrees(newLatling[0], newLatling[1], 10);
                    model.position = position;
                    $("#speed").text(Math.round(moveAmount * 100) + " km/h");
                    if (moveAmount * 1000 > 4980) {

                    } else {
                        moveAmount += 0.01;
                    }
                    point.position = position;
                    viewer.camera.lookAt(
                        Cesium.Cartesian3.fromDegrees(newLatling[0], newLatling[1], 2),
                        // targetPosition,
                        new Cesium.HeadingPitchRange(headingPitchRoll.heading, Cesium.Math.toRadians(0), 10)
                    );
                    var aa = new gisFunctions().createBackCoord([lon, lat], Cesium.Math.toDegrees(headingPitchRoll.heading), 800);
                    viewer1.camera.lookAt(
                        Cesium.Cartesian3.fromDegrees(aa[0], aa[1], 1000),
                        // targetPosition,
                        new Cesium.HeadingPitchRange(headingPitchRoll.heading, Cesium.Math.toRadians(-50), Cesium.Math.toRadians(1))
                    );
                    let obju = {
                        userName: user,
                        cords: [lon, lat],
                        glbPath: "pickup van.glb",
                        orientation: Cesium.Transforms.headingPitchRollQuaternion(position, headingPitchRoll),
                        isOnline: true
                    }
                    ref.set(obju)
                    break;
                case 'ArrowDown':
                    moveAmount = 0.33;
                    $("#speed").text(moveAmount + " km/h");

                    var cartographic = Cesium.Cartographic.fromCartesian(position);
                    var lon = Cesium.Math.toDegrees(cartographic.longitude);
                    var lat = Cesium.Math.toDegrees(cartographic.latitude);

                    var newLatling = new gisFunctions().createCoord([lon, lat], Cesium.Math.toDegrees(headingPitchRoll.heading) - 180, moveAmount)
                    position = Cesium.Cartesian3.fromDegrees(newLatling[0], newLatling[1], 10);
                    model.position = position;
                    point.position = position;
                    viewer.camera.lookAt(
                        Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 2),
                        // targetPosition,
                        new Cesium.HeadingPitchRange(headingPitchRoll.heading, Cesium.Math.toRadians(0), 10)
                    );
                    var aa = new gisFunctions().createBackCoord([lon, lat], Cesium.Math.toDegrees(headingPitchRoll.heading), 800);
                    viewer1.camera.lookAt(
                        Cesium.Cartesian3.fromDegrees(aa[0], aa[1], 1000),
                        // targetPosition,
                        new Cesium.HeadingPitchRange(headingPitchRoll.heading, Cesium.Math.toRadians(-50), Cesium.Math.toRadians(1))
                    );
                    let objd = {
                        userName: user,
                        cords: [lon, lat],
                        glbPath: "pickup van.glb",
                        orientation: Cesium.Transforms.headingPitchRollQuaternion(position, headingPitchRoll),
                        isOnline: true
                    }
                    ref.set(objd)

                    break;
                default:
                    return;
            }
        }
        viewer.scene.requestRender();
    }

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

})