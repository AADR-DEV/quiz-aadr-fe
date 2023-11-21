import { Button, ButtonText, Text } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";

export default function ScoreResult({ score, navigation }: any) {
    return (
        <Box
            alignItems="center"
            gap={10}
            mt={10}
            width={400}
            height={400}
        >
            <Text
                fontWeight="bold"
                fontSize="$xl"
                color='white'
            >Congratulations!</Text>
            <Text
                fontWeight="bold"
                fontSize="$xl"
                color='white'
            >You scored</Text>
            <Text
                fontWeight="bold"
                fontSize="$3xl"
                color='white'
                bg="$primaryBg"
                py={40}
                px={20}
                alignSelf='center'
            >{score}</Text>
            <Button
                mt={4}
                onPress={() => navigation.navigate('Home')}
                rounded={'$lg'}
            >
                <ButtonText>Done</ButtonText>
            </Button>
        </Box >
    )
}