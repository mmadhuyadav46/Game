 
    let maindb = firebase.database().ref();
    let dummyUsers;

    var entity=[]; 
    var unsentity=[]; 
    var otherpoint=[];
    $("#start").click(function () {
    maindb.on("value", function (snapshot) {
        let data = snapshot.val();
        let keys = Object.keys(data);

        for (let i = 0; i < keys.length; i++) {
            let val = keys[i]
            let a = data[val] 
            if (a.userName != user) {

                if (unsentity.includes(a.userName)) {
                    for(var o=0;o<entity.length;o++){
                        if(entity[o].id ==a.userName){

                            let lat = a.cords[1];
                            let long = a.cords[0]; 
                            entity[o].position = Cesium.Cartesian3.fromDegrees(long, lat);
                            entity[o].orientation = a.orientation,
                            otherpoint[o].position = Cesium.Cartesian3.fromDegrees(long, lat);
                        }
                    }
                }
                else { 
                    unsentity.push(a.userName);
                            entity.push(viewer.entities.add({
                                name: 'Draggable Point',
                                id: a.userName,
                                position: Cesium.Cartesian3.fromDegrees(a.cords[0], a.cords[1]),
                                orientation: a.orientation,
                                model: {
                                    uri: "/resources/Models/ech_move.glb",
                                    scale: 0.5,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                        },
                        label: {
                            show: true,
                            text: a.userName,
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
                            eyeOffset: new Cesium.Cartesian3(0, 5, 0),
                        },
                    }));
                    otherpoint.push(viewer1.entities.add({
                        position: position,
                        id:a.userName,
                        point: {
                            pixelSize: 10,
                            color: Cesium.Color.RED,
                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                        },
                        label: {
                            show: true,
                            text: a.userName,
                            font: "bold 14px sans-serif",
                            showBackground: true,
                            scale: 1.0,
                            disableDepthTestDistance: Number.POSITIVE_INFINITY,
                            fillColor: Cesium.Color.RED,
                            outlineWidth: 10,
                            outlineColor: Cesium.Color.BLACK,
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            pixelOffset: new Cesium.Cartesian2(0, 15),
                            eyeOffset: new Cesium.Cartesian3(0, 0, 0),
                        },
                    }))
                    //viewer1.zoomTo(otherpoint);
                    
                }
                }
        }



    })



    function del() {
        viewer.entities.remove(entity)

    }
});