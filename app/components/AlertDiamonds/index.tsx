import {
    Box,
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    Heading,
    Text,
    Button,
    ButtonText,
} from "@gluestack-ui/themed";
import AppLottieView from "../AppLottieView";


export default function AlertDiamonds({ showAlertDialog, setShowAlertDialog, navigation }: any) {
    return (
        <Box>
            {showAlertDialog && (
                <AlertDialog
                    isOpen={showAlertDialog}
                    onClose={() => {
                        setShowAlertDialog(false);
                    }}
                >
                    <AlertDialogContent
                        bg="white"
                    >
                        <AlertDialogHeader>
                            <Box
                                alignItems="center"
                                justifyContent="center"
                                width={"100%"}
                            >
                                <Heading
                                    size="lg"
                                    color="$primaryBg">
                                    Not enough diamonds
                                </Heading>
                                <AppLottieView
                                    animation={require('./sad_animation.json')}
                                    autoPlay
                                    loop
                                    style={{
                                        width: 200,
                                        height: 200,
                                    }}
                                />
                            </Box>
                            <AlertDialogCloseButton onPress={() => setShowAlertDialog(false)} />
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Text
                                color="$primaryBg"
                                fontWeight="bold"
                                textAlign="center"
                            >Want to buy more diamonds?</Text>
                        </AlertDialogBody>
                        <AlertDialogFooter
                            justifyContent="space-between"
                        >
                            <Button
                                onPress={() => {
                                    setShowAlertDialog(false);
                                }}
                                bg="$redButton"
                            >
                                <ButtonText>
                                    Not Now
                                </ButtonText>
                            </Button>
                            <Button
                                onPress={() => {
                                    setShowAlertDialog(false);
                                    navigation.navigate('Shop');
                                }}
                                bg="$greenButton"
                            >
                                <ButtonText>
                                    Continue
                                </ButtonText>
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </Box>
    )
}