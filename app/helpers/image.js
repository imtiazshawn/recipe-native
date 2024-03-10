import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';
import { Animated } from "react-native";

export const CachedImage = (props) => {
    const [cachedSource, setCachedSource] = useState(null);
    const { uri } = props;

    useEffect(() => {
        const getCachedImage = async () => {
            try {
                const cachedImageData = await AsyncStorage.getItem(uri);

                if(cachedImageData) {
                    setCachedSource(cachedImageData); 
                } else {
                    const response = await fetch(uri);
                    const imageBlob = await response.blob();
                    const base64Data = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                        reader.onerror = (error) => {
                            reject(error);
                        };
                    });
                    await AsyncStorage.setItem(uri, base64Data);
                    setCachedSource(base64Data);
                }
            } catch (error) {
                console.error('Error caching image:', error)
            }
        }
        
        getCachedImage();
    }, []);

    return (<Animated.Image source={{ uri: `data:image/png;base64,${cachedSource}` }} {...props} />)
}
