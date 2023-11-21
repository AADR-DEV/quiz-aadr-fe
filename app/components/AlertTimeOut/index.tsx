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




export default function AlertTimeOut({ showAlertDialog, setShowAlertDialog, handleNextQuestion }: any) {
    return (
        <Box>
            {showAlertDialog && (
                <AlertDialog
                    isOpen={showAlertDialog}
                    onClose={() => {
                        setShowAlertDialog(false);
                        handleNextQuestion();
                    }}
                >
                    <AlertDialogContent
                        bg="white"
                    >
                        <AlertDialogHeader>
                            <Heading
                                size="lg"
                                color="$primaryBg">
                                Time is up!
                            </Heading>
                            <AlertDialogCloseButton onPress={() => setShowAlertDialog(false)} />
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Text
                                color="$primaryBg"
                            >Moving to the next question.</Text>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                onPress={() => {
                                    setShowAlertDialog(false);
                                    handleNextQuestion();
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