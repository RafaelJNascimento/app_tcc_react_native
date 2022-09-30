import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    View,
    TouchableOpacity,
    Text,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Home = () => {

    const [estabelecimentos, setEstabelecimentos] = useState([]);

    const {
        navigate
    } = useNavigation();

    useEffect(() => {
        loadEstabelecimentos()
    }, []);

    const loadEstabelecimentos = async () => {
        await firestore().collection("estabelecimentos")
            .onSnapshot((query) => {
                const list = [];
                query.forEach((doc) => {
                    list.push({ ...doc.data(), id: doc.id });
                });
                setEstabelecimentos(list);
            });
    }

    const onPressItem = () => {

        // for(let i = 0; i < 10; i++)
        /* 
        firestore()
             .collection("estabelecimentos")
             .add({
                 capa: "",
                 img: "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjJDNUU4RTYyN0QwMTFFOUE5Q0VGRTJFQzc2MzBFOTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjJDNUU4RTcyN0QwMTFFOUE5Q0VGRTJFQzc2MzBFOTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMkM1RThFNDI3RDAxMUU5QTlDRUZFMkVDNzYzMEU5OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGMkM1RThFNTI3RDAxMUU5QTlDRUZFMkVDNzYzMEU5OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAYEBAQFBAYFBQYJBgUGCQsI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",
                 nome: "Peixe salgado",
                 created_at: firestore.FieldValue.serverTimestamp(),
                 produtos: [
                     {
                         nome: "Tilápia",
                         quantidade: "1000",
                         valor: "40.00",
                     }
                 ]
             })
             .then(() => {
                Alert.alert("Cadastro", " Cadastrado com sucesso");
             })
             .catch((err) => console.log(err));
 
             */
    }

    function Estabelecimento() {
        let aux = [];
        for (let i = 0; i < estabelecimentos.length; i++) {
            aux.push(
                <TouchableOpacity
                    key={i}
                    onPress={onPressItem}
                    style={{
                        height: 120,
                        width: "32.77%",
                        margin: 1,
                        backgroundColor: "#fff"
                    }}
                >
                    <Image
                        style={{
                            height: 100,
                            width: "100%",
                            resizeMode: "contain",
                        }}
                        source={{ uri: estabelecimentos[i].img }}
                    />
                    <Text
                        style={{
                            fontSize: 11
                        }}
                    >{estabelecimentos[i].nome}</Text>
                </TouchableOpacity>
            );
        }
        return aux
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}>
            <View style={{
                marginTop: 0,
                height: 25,
                paddingLeft: 5,
                justifyContent: "center",
                backgroundColor: "white"
            }}>
                <Text
                    style={{
                        fontSize: 14
                    }}
                >Estabelecimentos</Text>
            </View>
            <ScrollView>
                <View style={{
                    width: "95%",
                    alignSelf: "center",
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}
                >
                    {
                        Estabelecimento()
                    }
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

export default Home;