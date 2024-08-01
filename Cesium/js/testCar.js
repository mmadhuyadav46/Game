/**
 * 该示例由 刘博方 开发，
 * 开源地址：CesiumRoleController类最新代码在
 * https://www.npmjs.com/package/cesium-role-controller?activeTab=code
 */
class CesiumRoleController {
    constructor(Cesium, viewer) {
        this.Cesium = Cesium
        this.viewer = viewer
        this.hpRoll = new Cesium.HeadingPitchRoll(0, 0, 0)
        this.position = null
        this.speed = 1
        this.rolePrimitive = null
        this.boundingSphere = null
        this.speedVector = new Cesium.Cartesian3()
        this.hpRange = new Cesium.HeadingPitchRange()
        this.converter = Cesium.Transforms.localFrameToFixedFrameGenerator("north", "west")
        this.cartographic_terrain = null
        this.cartographic_3dtiles = null
        this.event = false
        this.animation = "walk"
        this.radian = Cesium.Math.toRadians(1)
        this.model;
        this.modelUrl = "/resources/Models/carCenter.glb"
        this.Buffer = [
            { "type": "Feature", "properties": { "FID_1": 0 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[78.585109862868194, 17.497665749760642], [78.585530078865133, 17.491344693211147], [78.58674195690412, 17.490461363387283], [78.588997555959054, 17.485845503435939], [78.58893867150033, 17.483552113186192], [78.586657764032054, 17.478763046707854], [78.584717512669272, 17.479427025167638], [78.578790074739857, 17.480346014246209], [78.57630181006374, 17.481264312646204], [78.575605689346389, 17.481151296348571], [78.571090973015487, 17.473386161552412], [78.570912896974107, 17.473378836407107], [78.570841484531911, 17.473381133068642], [78.569607375402541, 17.473677985958659], [78.569070190416483, 17.473913708731175], [78.56871534909817, 17.474108326995065], [78.567979053361967, 17.475056030348185], [78.567216144524707, 17.476460653027004], [78.566861303206451, 17.476545268504822], [78.564217729637505, 17.476790654977208], [78.563499175967593, 17.477002193214787], [78.563392723571724, 17.477061423876421], [78.563853009316517, 17.480673409113535], [78.564227007245336, 17.481977612426022], [78.564954431949957, 17.483441410257228], [78.56609607527173, 17.485424641860504], [78.566584028566751, 17.487235412111602], [78.566992096082174, 17.487895372705111], [78.568571139952041, 17.488876848131781], [78.569706632172313, 17.489333740057987], [78.570664708472009, 17.489409890385673], [78.571267938714641, 17.489579109255828], [78.573157468737236, 17.490822863116307], [78.574867443429923, 17.492048523231404], [78.576499713496958, 17.493046897798024], [78.577839942674359, 17.494046384293938], [78.578931079730637, 17.495247804219446], [78.580338196984428, 17.496852107336792], [78.581101105819926, 17.497537414730914], [78.585109862868194, 17.497665749760642]], [[78.570939630907787, 17.473614153526], [78.571085998459807, 17.473679156377784], [78.575581900726263, 17.481479258331319], [78.576279997483766, 17.481609534171014], [78.578556399950969, 17.48068312617022], [78.584849322054367, 17.479642150033612], [78.586518683863176, 17.479077614614482], [78.58867262700204, 17.483559937112375], [78.588702280522739, 17.4857491216369], [78.586670115827019, 17.490242309505959], [78.585303497168809, 17.491232720520145], [78.584894015763552, 17.497497656507562], [78.583477892572034, 17.497465111943711], [78.581028977090796, 17.497296984004379], [78.579947227047114, 17.496225292839085], [78.577993370482091, 17.493945933154578], [78.576151662660777, 17.49264628391694], [78.574877043785079, 17.491886485572877], [78.57402949841503, 17.491180813986489], [78.572450832269851, 17.490138012239811], [78.571746958877554, 17.489636486180245], [78.570899053386313, 17.489290656796072], [78.570514148919472, 17.489242772675766], [78.569833593195881, 17.489194888543011], [78.569242623265268, 17.489000778595539], [78.568113759535663, 17.488456455406151], [78.567627258014625, 17.488098855130204], [78.567126832456552, 17.487754141326036], [78.566844184687227, 17.487329877285731], [78.566679838517814, 17.486969133875164], [78.566336515764135, 17.485638838192131], [78.566121939043285, 17.485127183415102], [78.56540311098189, 17.483837812194793], [78.564941771031442, 17.483141954456414], [78.56435203759338, 17.481943201031356], [78.563976528330727, 17.48074590227202], [78.563844448437408, 17.479387789891064], [78.563608414044154, 17.477279690525279], [78.564219957700004, 17.476972683725364], [78.564767128338417, 17.476931749446635], [78.56568893296037, 17.476897911579726], [78.567137325826991, 17.476713707176543], [78.567394817892932, 17.476549969772122], [78.567663038795104, 17.476099691149898], [78.567888344352241, 17.475659645056624], [78.568210209433516, 17.475045625473911], [78.568521345370414, 17.474615808242504], [78.568961227648401, 17.474155291108048], [78.56947621178, 17.473950616452498], [78.570280874484467, 17.473766409065036], [78.570939630907787, 17.473614153526]]]] } }
        ]
        this.flag = {
            moveUp: false,
            moveDown: false,
            moveLeft: false,
            moveRight: false
        }
        this.options = null
        this.keydownFlag = false
        this.getArrayDepth = function (value) {
            // Ensure 'value' is an array
            if (Array.isArray(value)) {
                // If 'value' is an array, map the depth of each element
                // and add 1 for the current depth level
                return 1 + Math.max(0, ...value.map(this.getArrayDepth));
            } else {
                // If 'value' is not an array, the depth is 0
                return 0;
            }
        };

        document.addEventListener("keydown", (e) => {
            if (this.event) {
                this.setFlagStatus(e, true)
            }
        })

        document.addEventListener("keyup", (e) => {
            if (this.event) {
                this.setFlagStatus(e, false)
            }
        })


        viewer.clock.onTick.addEventListener((clock) => {
            if (this.event) {
                if (this.flag.moveUp) {
                    if (this.flag.moveLeft) {
                        this.hpRoll.heading -= this.radian
                    }

                    if (this.flag.moveRight) {
                        this.hpRoll.heading += this.radian
                    }
                    var latLong= Cesium.Cartographic.fromCartesian(this.position);
                    let obju = {
                        userName: user,
                        cords: [Cesium.Math.toDegrees(latLong.longitude),Cesium.Math.toDegrees(latLong.latitude)],
                        glbPath: "pickup van.glb",
                        orientation: Cesium.Transforms.headingPitchRollQuaternion(this.position, this.hpRoll),
                        isOnline: true
                    }
                    this.move(true)
                    ref.set(obju)
                }

                if (this.flag.moveDown) {
                    if (this.flag.moveLeft) {
                        this.hpRoll.heading -= this.radian
                    }

                    if (this.flag.moveRight) {
                        this.hpRoll.heading += this.radian
                    }
                    var latLong= Cesium.Cartographic.fromCartesian(this.position);
                    let obju = {
                        userName: user,
                        cords: [Cesium.Math.toDegrees(latLong.longitude),Cesium.Math.toDegrees(latLong.latitude)],
                        glbPath: "pickup van.glb",
                        orientation: Cesium.Transforms.headingPitchRollQuaternion(this.position, this.hpRoll),
                        isOnline: true
                    }
                    ref.set(obju)
                    this.move(false)
                }

                if (this.flag.moveLeft && !this.flag.moveDown && !this.flag.moveUp && !this.flag.moveRight) {
                    this.hpRoll.heading -= this.radian
                    Cesium.Transforms.headingPitchRollToFixedFrame(
                        this.position,
                        this.hpRoll,
                        Cesium.Ellipsoid.WGS84,
                        this.converter,
                        this.rolePrimitive.modelMatrix
                    )
                    var latLong= Cesium.Cartographic.fromCartesian(this.position);
                    let obju = {
                        userName: user,
                        cords: [Cesium.Math.toDegrees(latLong.longitude),Cesium.Math.toDegrees(latLong.latitude)],
                        glbPath: "pickup van.glb",
                        orientation: Cesium.Transforms.headingPitchRollQuaternion(this.position, this.hpRoll),
                        isOnline: true
                    }
                    ref.set(obju)
                }

                if (this.flag.moveRight && !this.flag.moveDown && !this.flag.moveUp && !this.flag.moveLeft) {
                    this.hpRoll.heading += this.radian
                    Cesium.Transforms.headingPitchRollToFixedFrame(
                        this.position,
                        this.hpRoll,
                        Cesium.Ellipsoid.WGS84,
                        this.converter,
                        this.rolePrimitive.modelMatrix
                    )
                    var latLong= Cesium.Cartographic.fromCartesian(this.position);
                    let obju = {
                        userName: user,
                        cords: [Cesium.Math.toDegrees(latLong.longitude),Cesium.Math.toDegrees(latLong.latitude)],
                        glbPath: "pickup van.glb",
                        orientation: Cesium.Transforms.headingPitchRollQuaternion(this.position, this.hpRoll),
                        isOnline: true
                    }
                    ref.set(obju)
                }
            }
        })
    }
    checkIfPointIsFallingInBuffer(PointFromMovement) {
        const vehicleCoordinate = PointFromMovement;
        var pt = turf.point(vehicleCoordinate);
        let isInside = false;
        var pt = turf.point(PointFromMovement);
        var poly = turf.polygon([[[78.585109862868194, 17.497665749760642], [78.585530078865133, 17.491344693211147], [78.58674195690412, 17.490461363387283], [78.588997555959054, 17.485845503435939], [78.58893867150033, 17.483552113186192], [78.586657764032054, 17.478763046707854], [78.584717512669272, 17.479427025167638], [78.578790074739857, 17.480346014246209], [78.57630181006374, 17.481264312646204], [78.575605689346389, 17.481151296348571], [78.571090973015487, 17.473386161552412], [78.570912896974107, 17.473378836407107], [78.570841484531911, 17.473381133068642], [78.569607375402541, 17.473677985958659], [78.569070190416483, 17.473913708731175], [78.56871534909817, 17.474108326995065], [78.567979053361967, 17.475056030348185], [78.567216144524707, 17.476460653027004], [78.566861303206451, 17.476545268504822], [78.564217729637505, 17.476790654977208], [78.563499175967593, 17.477002193214787], [78.563392723571724, 17.477061423876421], [78.563853009316517, 17.480673409113535], [78.564227007245336, 17.481977612426022], [78.564954431949957, 17.483441410257228], [78.56609607527173, 17.485424641860504], [78.566584028566751, 17.487235412111602], [78.566992096082174, 17.487895372705111], [78.568571139952041, 17.488876848131781], [78.569706632172313, 17.489333740057987], [78.570664708472009, 17.489409890385673], [78.571267938714641, 17.489579109255828], [78.573157468737236, 17.490822863116307], [78.574867443429923, 17.492048523231404], [78.576499713496958, 17.493046897798024], [78.577839942674359, 17.494046384293938], [78.578931079730637, 17.495247804219446], [78.580338196984428, 17.496852107336792], [78.581101105819926, 17.497537414730914], [78.585109862868194, 17.497665749760642]], [[78.570939630907787, 17.473614153526], [78.571085998459807, 17.473679156377784], [78.575581900726263, 17.481479258331319], [78.576279997483766, 17.481609534171014], [78.578556399950969, 17.48068312617022], [78.584849322054367, 17.479642150033612], [78.586518683863176, 17.479077614614482], [78.58867262700204, 17.483559937112375], [78.588702280522739, 17.4857491216369], [78.586670115827019, 17.490242309505959], [78.585303497168809, 17.491232720520145], [78.584894015763552, 17.497497656507562], [78.583477892572034, 17.497465111943711], [78.581028977090796, 17.497296984004379], [78.579947227047114, 17.496225292839085], [78.577993370482091, 17.493945933154578], [78.576151662660777, 17.49264628391694], [78.574877043785079, 17.491886485572877], [78.57402949841503, 17.491180813986489], [78.572450832269851, 17.490138012239811], [78.571746958877554, 17.489636486180245], [78.570899053386313, 17.489290656796072], [78.570514148919472, 17.489242772675766], [78.569833593195881, 17.489194888543011], [78.569242623265268, 17.489000778595539], [78.568113759535663, 17.488456455406151], [78.567627258014625, 17.488098855130204], [78.567126832456552, 17.487754141326036], [78.566844184687227, 17.487329877285731], [78.566679838517814, 17.486969133875164], [78.566336515764135, 17.485638838192131], [78.566121939043285, 17.485127183415102], [78.56540311098189, 17.483837812194793], [78.564941771031442, 17.483141954456414], [78.56435203759338, 17.481943201031356], [78.563976528330727, 17.48074590227202], [78.563844448437408, 17.479387789891064], [78.563608414044154, 17.477279690525279], [78.564219957700004, 17.476972683725364], [78.564767128338417, 17.476931749446635], [78.56568893296037, 17.476897911579726], [78.567137325826991, 17.476713707176543], [78.567394817892932, 17.476549969772122], [78.567663038795104, 17.476099691149898], [78.567888344352241, 17.475659645056624], [78.568210209433516, 17.475045625473911], [78.568521345370414, 17.474615808242504], [78.568961227648401, 17.474155291108048], [78.56947621178, 17.473950616452498], [78.570280874484467, 17.473766409065036], [78.570939630907787, 17.473614153526]]]);

        isInside = turf.booleanPointInPolygon(pt, poly);
        return isInside;
    }
    init(Options) {
        this.viewer.scene.preUpdate.addEventListener((scene, time) => {
            if (this.event) {
                if (this.rolePrimitive && this.boundingSphere) {
                    if (this.keydownFlag) {
                        this.zoomToModel(Options)
                    }
                }
            }
        })
        this.options = Options
        this.options.speed ? (this.speed = this.options.speed) : (this.speed = 1)
        
        var quaternion = this.options.orientation; 
        var hpr = Cesium.HeadingPitchRoll.fromQuaternion(quaternion);
        this.hpRoll = new this.Cesium.HeadingPitchRoll(hpr.heading+15.7,0, 0); 

        this.position = this.Cesium.Cartesian3.fromDegrees(this.options.position[0], this.options.position[1])
        this.event = true
        const winPosition = this.Cesium.SceneTransforms.worldToWindowCoordinates(this.viewer.scene, this.position)
        const ray = this.viewer.camera.getPickRay(winPosition)
        const cartesian_terrain = this.viewer.scene.globe.pick(ray, this.viewer.scene)
        const cartesian_3dtiles = this.viewer.scene.pickPosition(winPosition)

        if (cartesian_terrain) {
            this.cartographic_terrain = this.Cesium.Cartographic.fromCartesian(cartesian_terrain)
        }
        if (cartesian_3dtiles) {
            this.cartographic_3dtiles = this.Cesium.Cartographic.fromCartesian(cartesian_3dtiles)
        }

        if (this.cartographic_3dtiles && this.cartographic_3dtiles.height > 0) {
            this.viewer.scene.clampToHeightMostDetailed([this.position]).then((newP) => {
                if (this.Cesium.Cartographic.fromCartesian(newP[0]).height > 0) {
                    this.position = newP[0]
                    this.addModel(this.position, Options)
                }
            })
        } else if (this.cartographic_terrain) {
            if (this.cartographic_terrain.height > 0) {
                this.Cesium.sampleTerrainMostDetailed(this.viewer.terrainProvider, [
                    this.viewer.scene.globe.ellipsoid.cartesianToCartographic(this.position)
                ]).then(async (newP) => {
                    this.position = this.viewer.scene.globe.ellipsoid.cartographicToCartesian(newP[0])
                    this.addModel(this.position, Options)
                })
            } else {
                this.addModel(this.position, Options)
            }
        } else {
            this.addModel(this.position, Options)
        }
    }

    setFlagStatus(key, value) {
        if (this.rolePrimitive) {
            switch (key.keyCode) {
                case 65:
                    this.flag.moveLeft = value
                    break
                case 87:
                    this.validateKey(value)
                    this.flag.moveUp = value
                    break
                case 68:
                    this.flag.moveRight = value
                    break
                case 83:
                    this.validateKey(value)
                    this.flag.moveDown = value
                    break
            }
        }

    }

    validateKey(value) {
        this.viewer.clockViewModel.shouldAnimate = value
        this.keydownFlag = value
    }

    zoomToModel(Options) {
        const r = 2.0 * Math.max(this.boundingSphere.radius, this.viewer.camera.frustum.near)
        let pitch = 0
        let lockViewLevel = 0
        let range = 0
        Options.pitch ? (pitch = Options.pitch) : (pitch = -25)
        Options.lockViewLevel ? (lockViewLevel = Options.lockViewLevel) : (lockViewLevel = 3)
        Options.range ? (range = Options.range) : (range = 4.0)
        switch (lockViewLevel) {
            case 1:
                this.hpRange.heading = this.viewer.camera.heading
                this.hpRange.pitch = this.viewer.camera.pitch
                break
            case 2:
                this.hpRange.heading = this.hpRoll.heading - this.Cesium.Math.toRadians(90)
                this.hpRange.pitch = this.viewer.camera.pitch
                break
            default:
                this.hpRange.heading = this.hpRoll.heading - this.Cesium.Math.toRadians(90)
                this.hpRange.pitch = this.Cesium.Math.toRadians(pitch)
                break
        }
        this.hpRange.range = r * range
        this.viewer.camera.lookAt(this.boundingSphere.center, this.hpRange)
    }

    move(isUP) {
        if (isUP > 0) {
            this.speedVector = this.Cesium.Cartesian3.multiplyByScalar(this.Cesium.Cartesian3.UNIT_Y, this.speed, this.speedVector)
        } else {
            this.speedVector = this.Cesium.Cartesian3.multiplyByScalar(this.Cesium.Cartesian3.UNIT_Y, -this.speed, this.speedVector)
        }
        this.position = this.Cesium.Matrix4.multiplyByPoint(this.rolePrimitive.modelMatrix, this.speedVector, this.position)

        if (this.cartographic_3dtiles && this.cartographic_3dtiles.height > 0) {
            this.viewer.scene.clampToHeightMostDetailed([this.position]).then((newP) => {
                if (this.Cesium.Cartographic.fromCartesian(newP[0]).height > 0) {
                    this.position = newP[0]
                    this.Cesium.Transforms.headingPitchRollToFixedFrame(
                        this.position,
                        this.hpRoll,
                        this.Cesium.Ellipsoid.WGS84,
                        this.converter,
                        this.rolePrimitive.modelMatrix
                    )
                }
            })
        } else if (this.cartographic_terrain) {
            if (this.cartographic_terrain.height > 0) {
                this.Cesium.sampleTerrainMostDetailed(this.viewer.terrainProvider, [
                    this.viewer.scene.globe.ellipsoid.cartesianToCartographic(this.position)
                ]).then((newP) => {
                    this.position = this.viewer.scene.globe.ellipsoid.cartographicToCartesian(newP[0])
                    this.Cesium.Transforms.headingPitchRollToFixedFrame(
                        this.position,
                        this.hpRoll,
                        this.Cesium.Ellipsoid.WGS84,
                        this.converter,
                        this.rolePrimitive.modelMatrix
                    )
                })
            } else {
                const Cartographic = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(this.position)
                Cartographic.height = 0
                this.position = this.viewer.scene.globe.ellipsoid.cartographicToCartesian(Cartographic)
                this.Cesium.Transforms.headingPitchRollToFixedFrame(
                    this.position,
                    this.hpRoll,
                    this.Cesium.Ellipsoid.WGS84,
                    this.converter,
                    this.rolePrimitive.modelMatrix
                )
            }
        } else {
            const Cartographic = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(this.position)
            var longitude = Cesium.Math.toDegrees(Cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(Cartographic.latitude);
            var height = Cartographic.height;
            let conditionWheather_ItisgoinginsideCircle = this.checkIfPointIsFallingInBuffer([longitude, latitude])

            if (conditionWheather_ItisgoinginsideCircle) {
                this.position = this.viewer.scene.globe.ellipsoid.cartographicToCartesian(Cartographic)
                this.Cesium.Transforms.headingPitchRollToFixedFrame(
                    this.position,
                    this.hpRoll,
                    this.Cesium.Ellipsoid.WGS84,
                    this.converter,
                    this.rolePrimitive.modelMatrix
                )
            }
        }
    }

    reset() {
        this.hpRoll = new this.Cesium.HeadingPitchRoll(0, 0, 0)
        this.position = null
        this.speed = 1
        this.rolePrimitive = null
        this.boundingSphere = null
        this.speedVector = new this.Cesium.Cartesian3()
        this.hpRange = new this.Cesium.HeadingPitchRange()
        this.converter = this.Cesium.Transforms.localFrameToFixedFrameGenerator("north", "west")
        this.cartographic_terrain = null
        this.cartographic_3dtiles = null
        this.event = false
        this.radian = this.Cesium.Math.toRadians(1)
        this.flag = {
            moveUp: false,
            moveDown: false,
            moveLeft: false,
            moveRight: false
        }
        this.options = null
        this.keydownFlag = false
    }

    destroy() {
        this.event = false
        this.viewer.camera.lookAtTransform(this.Cesium.Matrix4.IDENTITY)
        this.viewer.scene.primitives.remove(this.rolePrimitive)
        this.reset()
    }

    async addModel(position, Options) {
        const model = await this.Cesium.Model.fromGltfAsync({
            url: this.modelUrl,
            modelMatrix: this.Cesium.Transforms.headingPitchRollToFixedFrame(position, this.hpRoll, this.Cesium.Ellipsoid.WGS84, this.converter),
            scale: 2
            // minimumPixelSize: 128
        })
        this.rolePrimitive = this.viewer.scene.primitives.add(model)

        this.rolePrimitive.readyEvent.addEventListener(() => {
            // if (Options.animation ="Charan") {
            //     this.rolePrimitive.activeAnimations.add({
            //         name: this.animation,
            //         loop: this.Cesium.ModelAnimationLoop.REPEAT
            //     })
            // }

            this.viewer.clockViewModel.shouldAnimate = false
            this.boundingSphere = this.rolePrimitive.boundingSphere
            this.zoomToModel(this.options)
        })
    }
}
