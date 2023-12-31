export interface Question {
    id: string;
    image: string;
    quetion: string; // Corrected from "quetion" to "question"
    trueans: string;
    falseans_1: string;
    falseans_2: string;
    falseans_3: string;
}

export interface QuizData {
    data: Question[];
}

const quizData: QuizData = {
    data: [
        {
            id: "1",
            image: "https://i.pinimg.com/564x/01/d7/f7/01d7f7e633ab271883253965e618a843.jpg",
            quetion: "Hayoo tebak ini hewan apa?",
            trueans: "Burung",
            falseans_1: "Singa",
            falseans_2: "Kucing Putih",
            falseans_3: "Elang",
        },
        {
            id: "2",
            image: "https://cdn.idntimes.com/content-images/post/20190826/14-elephuck2-8a606b05750917051e710bf34d940748_600x400.jpg",
            quetion: "Bantu saya, tebak ini apa?",
            trueans: "Gajah Bebek",
            falseans_1: "Gajah Kuning",
            falseans_2: "Gaje",
            falseans_3: "Bebek",
        },
        {
            id: "3",
            image: "https://pbs.twimg.com/media/F0fh6duaIAA6bDr.jpg",
            quetion: "Hewan ini suka makan daging, apakah dia?",
            trueans: "Kucing Kelaparan",
            falseans_1: "Kudo (Kucing Dino)",
            falseans_2: "Kurex (Kucing T-Rex)",
            falseans_3: "Kangguru",
        },
        {
            id: "4",
            image: "https://cdn.pnghd.pics/data/959/tebak-tebakan-gambar-hewan-lucu-1.jpg",
            quetion: "Hewan ini mempunyai cula, hewan apakah dia?",
            trueans: "BuBa",
            falseans_1: "Badak",
            falseans_2: "Burung",
            falseans_3: "Kutu",
        },
        {
            id: "5",
            image: "https://cdn.pnghd.pics/data/959/tebak-tebakan-gambar-hewan-6.jpg",
            quetion: "Hewan ini suka memakan nektar, hewan apakah dia?",
            trueans: "Kuja",
            falseans_1: "Kupu-kupu",
            falseans_2: "Gajah",
            falseans_3: "Tapir",
        },
        {
            id: "6",
            image: "https://www.boredpanda.com/blog/wp-content/uploads/2018/09/24332270_349144848883496_3316889116829810688_n-5bad4c6195e5d__880.jpg",
            quetion: "Hewan ini bisa berenang, apakah dia?",
            trueans: "PengPa (Penguin Paus)",
            falseans_1: "Paus",
            falseans_2: "Penguin",
            falseans_3: "Kutu Buku",
        },
        {
            id: "7",
            image: "https://www.boredpanda.com/blog/wp-content/uploads/2018/09/25011209_1130626050408154_4225155188173832192_n-5bad4c8d23a9b__880.jpg",
            quetion: "Hewan ini sering memakan teman sendiri?",
            trueans: "Marmut",
            falseans_1: "Singa",
            falseans_2: "Kudanil",
            falseans_3: "Kampret",
        },
        {
            id: "8",
            image: "https://www.boredpanda.com/blog/wp-content/uploads/2018/09/30084171_2106166152933020_253905117781164032_n-5bad4ccb5e623__880.jpg",
            quetion: "Hewan ini ada punuknya, hewan apakah dia?",
            trueans: "Unta",
            falseans_1: "Angsa",
            falseans_2: "Limbad",
            falseans_3: "Kucing",
        },
        {
            id: "9",
            image: "https://www.boredpanda.com/blog/wp-content/uploads/2018/09/aaaaa-5bad4cfa02e7b__880.jpg",
            quetion: "Mirip teman kalian, hewan apa ini?",
            trueans: "Mondog",
            falseans_1: "Anjing Buncit",
            falseans_2: "Beruang Hitam",
            falseans_3: "Koala",
        },
        {
            id: "10",
            image: "https://www.boredpanda.com/blog/wp-content/uploads/2018/09/36148913_2090379021284706_2597121467820802048_n-5bad4ce9a63ed__880.jpg",
            quetion: "Dia Suka makan kacang, hewan apa dia?",
            trueans: "Montu",
            falseans_1: "Monyet",
            falseans_2: "Tupai",
            falseans_3: "Kelinci",
        },
        {
            id: "11",
            image: "https://www.boredpanda.com/blog/wp-content/uploads/2018/09/24327292_301776066895358_6854248392546058240_n-5bad4c5b8d8ea__880.jpg",
            quetion: "Bisa barenang mode ngebut! tebak siapa dia?",
            trueans: "Hiu",
            falseans_1: "Kuda",
            falseans_2: "Kuhi",
            falseans_3: "Jaguar",
        },
        {
            id: "12",
            image: "https://www.boredpanda.com/blog/wp-content/uploads/2018/09/24845208_1482781601836816_6075873827429023744_n-5bad4c6e08fa5__880.jpg",
            quetion: "Hewan ini biasa balapan, hewan apakah dia?",
            trueans: "Bebek Racing",
            falseans_1: "Angsa",
            falseans_2: "Kuda",
            falseans_3: "Ferarri Putih",
        },
        {
            id: "13",
            image: "https://www.boredpanda.com/blog/wp-content/uploads/2018/09/25011143_149749029129853_6797941139367264256_n-5bad4c88afaff__880.jpg",
            quetion: "Jadi simbol Amerika Serikat, hewan apa dia?",
            trueans: "Elang",
            falseans_1: "Kuda",
            falseans_2: "Kudanil",
            falseans_3: "Buaya",
        },
        {
            id: "14",
            image: "https://www.boredpanda.com/blog/wp-content/uploads/2018/09/25013786_311945612640806_3196306333741613056_n-5bad4c9ac2006__880.jpg",
            quetion: "Suka berdingin-dingin, hewan apa dia?",
            trueans: "Beruang Ayam",
            falseans_1: "macan",
            falseans_2: "lynx",
            falseans_3: "leopard",
        },
    ],
};

export default quizData;
