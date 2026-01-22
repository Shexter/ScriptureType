const inputField = document.getElementById('input-field');
const timeEl = document.getElementById('time');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const textDisplay = document.getElementById('text-display');
const timerDuration = document.getElementById('timer-duration');
const wordsCount = document.getElementById('words-count');
const verseReferenceEl = document.getElementById('verse-reference');

const bibleBooks = {
    "Genesis": [
        { text: "In the beginning God created the heavens and the earth", reference: "Genesis 1:1", context: "The opening verse of the entire Bible, introducing God as the Creator of all things at the very start of time." },
        { text: "The earth was without form and void and darkness was upon the face of the deep", reference: "Genesis 1:2", context: "Describing the primordial state of creation before God's creative work began." },
        { text: "And the Spirit of God was moving over the face of the waters", reference: "Genesis 1:2", context: "The Holy Spirit's presence in creation, demonstrating God's intimate involvement from the beginning." },
        { text: "Let there be light and there was light", reference: "Genesis 1:3", context: "God's first act of creation, demonstrating His power to bring order out of chaos." },
        { text: "And God saw that the light was good and God separated the light from the darkness", reference: "Genesis 1:4", context: "God's approval of His creation and the establishment of day and night." },
        { text: "God called the light Day and the darkness he called Night", reference: "Genesis 1:5", context: "The naming of day and night, establishing the basic rhythm of creation." },
        { text: "And there was evening and there was morning one day", reference: "Genesis 1:5", context: "The completion of the first day of creation, establishing the pattern of days." },
        { text: "And God said Let there be a firmament in the midst of the waters", reference: "Genesis 1:6", context: "The beginning of the second day's creative work, separating the waters." },
        { text: "Let the earth put forth vegetation plants yielding seed and fruit trees", reference: "Genesis 1:11", context: "God's command for plant life to appear, demonstrating His provision for all creation." },
        { text: "And God made the two great lights the greater light to rule the day", reference: "Genesis 1:16", context: "Creation of the sun and moon, establishing the celestial order." },
        { text: "And the lesser light to rule the night and the stars", reference: "Genesis 1:16", context: "The moon and stars created to provide light in darkness." },
        { text: "Let the waters swarm with swarms of living creatures and let birds fly", reference: "Genesis 1:20", context: "God's command for aquatic and avian life to fill the earth." },
        { text: "Let the earth bring forth living creatures according to their kinds", reference: "Genesis 1:24", context: "Creation of land animals, completing the diversity of earthly life." },
        { text: "Let us make man in our image after our likeness", reference: "Genesis 1:26", context: "The Trinity's discussion before creating humanity, showing the purpose and dignity of human life." },
        { text: "So God created man in his own image in the image of God he created him", reference: "Genesis 1:27", context: "The creation of humanity in God's image, establishing the unique status of humans." },
        { text: "Male and female he created them", reference: "Genesis 1:27", context: "The creation of both genders, establishing complementary relationship." },
        { text: "Be fruitful and multiply and fill the earth and subdue it", reference: "Genesis 1:28", context: "God's blessing and commission to humanity to steward creation." },
        { text: "And God saw everything that he had made and behold it was very good", reference: "Genesis 1:31", context: "God's perfect evaluation of His complete creation, ending the creation account." }
    ],
    "Nicene Creed": [
        { text: "I believe in one God the Father Almighty", reference: "Nicene Creed 1", context: "First Ecumenical Council (Nicaea, 325 AD) - Opening declaration of monotheism and God's sovereignty, establishing the foundation of Christian faith against Arian heresy." },
        { text: "Maker of heaven and earth of all things visible and invisible", reference: "Nicene Creed 2", context: "First Ecumenical Council (Nicaea, 325 AD) - Affirmation of God as Creator of both material and spiritual realms, countering Gnostic dualism." },
        { text: "And in one Lord Jesus Christ the only begotten Son of God", reference: "Nicene Creed 3", context: "First Ecumenical Council (Nicaea, 325 AD) - Declaration of Christ's unique divinity and eternal sonship, the central Christological statement." },
        { text: "Begotten not made consubstantial with the Father", reference: "Nicene Creed 4", context: "First Ecumenical Council (Nicaea, 325 AD) - Key term 'homoousios' (consubstantial) defining Christ as of the same essence as Father, rejecting Arianism." },
        { text: "Through whom all things were made", reference: "Nicene Creed 5", context: "First Ecumenical Council (Nicaea, 325 AD) - Affirmation of Christ's role in creation, establishing His divine nature." },
        { text: "Who for us men and for our salvation came down from heaven", reference: "Nicene Creed 6", context: "First Ecumenical Council (Nicaea, 325 AD) - Statement of Christ's incarnation and salvific purpose." },
        { text: "And was incarnate by the Holy Spirit of the Virgin Mary and became man", reference: "Nicene Creed 7", context: "First Ecumenical Council (Nicaea, 325 AD) - Doctrine of the Incarnation, Christ's true humanity and virgin birth." },
        { text: "For our sake he was crucified under Pontius Pilate", reference: "Nicene Creed 8", context: "First Ecumenical Council (Nicaea, 325 AD) - Historical affirmation of Christ's crucifixion for human redemption." },
        { text: "He suffered death and was buried and rose again on the third day", reference: "Nicene Creed 9", context: "First Ecumenical Council (Nicaea, 325 AD) - Declaration of Christ's death, burial, and resurrection - the Paschal Mystery." },
        { text: "In accordance with the Scriptures", reference: "Nicene Creed 10", context: "First Ecumenical Council (Nicaea, 325 AD) - Affirmation that Christ's work fulfilled Old Testament prophecies." },
        { text: "And ascended into heaven and is seated at the right hand of the Father", reference: "Nicene Creed 11", context: "First Ecumenical Council (Nicaea, 325 AD) - Christ's exaltation and ongoing heavenly ministry." },
        { text: "He will come again in glory to judge the living and the dead", reference: "Nicene Creed 12", context: "First Ecumenical Council (Nicaea, 325 AD) - Eschatological hope of Christ's return and final judgment." },
        { text: "And his kingdom will have no end", reference: "Nicene Creed 13", context: "First Ecumenical Council (Nicaea, 325 AD) - Eternal nature of Christ's reign." },
        { text: "I believe in the Holy Spirit the Lord the giver of life", reference: "Nicene Creed 14", context: "First Ecumenical Council (Nicaea, 325 AD) - Divinity and life-giving work of the Holy Spirit." },
        { text: "Who proceeds from the Father and the Son", reference: "Nicene Creed 15", context: "First Ecumenical Council (Nicaea, 325 AD) - Filioque clause (added later) defining the Spirit's eternal procession." },
        { text: "Who with the Father and the Son is worshipped and glorified", reference: "Nicene Creed 16", context: "First Ecumenical Council (Nicaea, 325 AD) - Equal divinity and worship due to the Holy Spirit." },
        { text: "Who has spoken through the prophets", reference: "Nicene Creed 17", context: "First Ecumenical Council (Nicaea, 325 AD) - Spirit's role in divine revelation throughout salvation history." },
        { text: "I believe in one holy catholic and apostolic Church", reference: "Nicene Creed 18", context: "First Ecumenical Council (Nicaea, 325 AD) - Four marks of the true Church: unity, holiness, catholicity, and apostolicity." },
        { text: "I confess one baptism for the forgiveness of sins", reference: "Nicene Creed 19", context: "First Ecumenical Council (Nicaea, 325 AD) - Single sacrament of initiation and its efficacy." },
        { text: "And I look forward to the resurrection of the dead", reference: "Nicene Creed 20", context: "First Ecumenical Council (Nicaea, 325 AD) - Hope of bodily resurrection at the end of time." },
        { text: "And the life of the world to come Amen", reference: "Nicene Creed 21", context: "First Ecumenical Council (Nicaea, 325 AD) - Eternal life in the age to come, concluding the creed." }
    ],
    "Apostles Creed": [
        { text: "I believe in God the Father Almighty Creator of heaven and earth", reference: "Apostles Creed 1", context: "Ancient baptismal creed (2nd century) - Opening statement of faith in God as Creator, foundation of Christian belief." },
        { text: "And in Jesus Christ his only Son our Lord", reference: "Apostles Creed 2", context: "Ancient baptismal creed (2nd century) - Declaration of faith in Christ's unique identity and lordship." },
        { text: "Who was conceived by the Holy Spirit born of the Virgin Mary", reference: "Apostles Creed 3", context: "Ancient baptismal creed (2nd century) - Doctrine of the Virgin Birth and Christ's divine conception." },
        { text: "Suffered under Pontius Pilate was crucified died and was buried", reference: "Apostles Creed 4", context: "Ancient baptismal creed (2nd century) - Historical affirmation of Christ's passion and death." },
        { text: "He descended into hell the third day he rose again from the dead", reference: "Apostles Creed 5", context: "Ancient baptismal creed (2nd century) - Christ's descent to the dead and victorious resurrection." },
        { text: "He ascended into heaven and is seated at the right hand of God the Father Almighty", reference: "Apostles Creed 6", context: "Ancient baptismal creed (2nd century) - Christ's exaltation and heavenly reign." },
        { text: "From there he will come to judge the living and the dead", reference: "Apostles Creed 7", context: "Ancient baptismal creed (2nd century) - Eschatological hope of Christ's return and judgment." },
        { text: "I believe in the Holy Spirit the holy catholic Church", reference: "Apostles Creed 8", context: "Ancient baptismal creed (2nd century) - Faith in the Spirit and the universal Church." },
        { text: "The communion of saints the forgiveness of sins", reference: "Apostles Creed 9", context: "Ancient baptismal creed (2nd century) - Spiritual fellowship and sacramental forgiveness." },
        { text: "The resurrection of the body and the life everlasting Amen", reference: "Apostles Creed 10", context: "Ancient baptismal creed (2nd century) - Final hope of bodily resurrection and eternal life." }
    ],
    "Hail Mary": [
        { text: "Hail Mary full of grace the Lord is with you", reference: "Luke 1:28", context: "The Angel Gabriel greeting Mary with the Greek title 'Kecharitomene' (full of grace), indicating her unique state of divine favor and sinlessness as the chosen Mother of God." },
        { text: "Blessed are you among women and blessed is the fruit of your womb Jesus", reference: "Luke 1:42", context: "Elizabeth's inspired greeting to Mary, filled with the Holy Spirit, recognizing Mary's unique blessedness and the divine nature of her Child Jesus." },
        { text: "Holy Mary Mother of God pray for us sinners", reference: "Traditional", context: "The petitionary part of the Hail Mary, asking for Mary's intercession as Mother of God (Theotokos), a title defined at the Council of Ephesus (431 AD)." },
        { text: "Now and at the hour of our death Amen", reference: "Traditional", context: "Request for Mary's maternal intercession throughout life and especially at the moment of death, reflecting the Catholic belief in the communion of saints." }
    ],
    "Glory Be": [
        { text: "Glory be to the Father and to the Son and to the Holy Spirit", reference: "Traditional", context: "The Doxology - ancient Trinitarian praise formula dating from the early Church, expressing worship of the three Persons of the Holy Trinity as co-equal and co-eternal." },
        { text: "As it was in the beginning is now and ever shall be", reference: "Traditional", context: "Affirmation of God's unchanging nature and eternal kingdom, reflecting the timeless nature of divine worship throughout salvation history." },
        { text: "World without end Amen", reference: "Traditional", context: "Declaration of God's eternal reign and the everlasting nature of His kingdom, concluding the Trinitarian doxology with assent of faith." }
    ],
    "Psalm 23": [
        { text: "The Lord is my shepherd I shall not want", reference: "Psalm 23:1", context: "David's declaration of complete trust in God's provision and care as his shepherd." },
        { text: "He makes me lie down in green pastures he leads me beside still waters", reference: "Psalm 23:2", context: "God's gentle guidance providing rest and refreshment for His people." },
        { text: "He restores my soul he leads me in paths of righteousness", reference: "Psalm 23:3", context: "Spiritual renewal and moral direction provided by the divine shepherd." },
        { text: "For his name's sake", reference: "Psalm 23:3", context: "God's faithfulness rooted in His own character and reputation." },
        { text: "Even though I walk through the valley of the shadow of death I will fear no evil", reference: "Psalm 23:4", context: "God's presence gives courage even in life's darkest moments and challenges." },
        { text: "For you are with me your rod and your staff they comfort me", reference: "Psalm 23:4", context: "The shepherd's tools representing God's protection and guidance in difficult times." },
        { text: "You prepare a table before me in the presence of my enemies", reference: "Psalm 23:5", context: "God's provision and honor even when surrounded by adversaries." },
        { text: "You anoint my head with oil my cup overflows", reference: "Psalm 23:5", context: "Symbols of blessing, abundance, and divine favor from the shepherd's care." },
        { text: "Surely goodness and mercy shall follow me all the days of my life", reference: "Psalm 23:6", context: "The lifelong pursuit of God's goodness and unfailing love." },
        { text: "And I shall dwell in the house of the Lord forever", reference: "Psalm 23:6", context: "The ultimate hope of eternal fellowship with God in His heavenly dwelling." }
    ],
    "John": [
        { text: "In the beginning was the Word and the Word was with God and the Word was God", reference: "John 1:1", context: "The profound opening of John's Gospel, establishing Jesus' divinity and eternal nature." },
        { text: "He was in the beginning with God", reference: "John 1:2", context: "Jesus' eternal coexistence with the Father before creation." },
        { text: "All things were made through him and without him was not any thing made", reference: "John 1:3", context: "Jesus as the agent of all creation, emphasizing His divine power." },
        { text: "In him was life and the life was the light of men", reference: "John 1:4", context: "Jesus as the source of both physical and spiritual life." },
        { text: "The light shines in the darkness and the darkness has not overcome it", reference: "John 1:5", context: "The triumph of Christ's light over spiritual darkness and evil." },
        { text: "There was a man sent from God whose name was John", reference: "John 1:6", context: "Introduction of John the Baptist as the forerunner of Christ." },
        { text: "He came as a witness to bear witness about the light", reference: "John 1:7", context: "John the Baptist's mission to point others to Jesus as the true light." },
        { text: "The true light which gives light to everyone was coming into the world", reference: "John 1:9", context: "Jesus' universal mission to bring spiritual enlightenment to all people." },
        { text: "He was in the world and the world was made through him yet the world did not know him", reference: "John 1:10", context: "The tragic irony of creation not recognizing its Creator." },
        { text: "He came to his own and his own people did not receive him", reference: "John 1:11", context: "Jesus' rejection by His own people Israel, despite being their Messiah." },
        { text: "But to all who did receive him who believed in his name he gave the right to become children of God", reference: "John 1:12", context: "The gift of spiritual adoption through faith in Jesus Christ." },
        { text: "Who were born not of blood nor of the will of the flesh nor of the will of man but of God", reference: "John 1:13", context: "The divine origin of spiritual rebirth, not human effort." },
        { text: "And the Word became flesh and dwelt among us", reference: "John 1:14", context: "The incarnation - God becoming human in the person of Jesus Christ." },
        { text: "And we have seen his glory glory as of the only Son from the Father", reference: "John 1:14", context: "The disciples' witness to Christ's divine glory on earth." },
        { text: "Full of grace and truth", reference: "John 1:14", context: "The perfect character of Jesus combining unmerited favor and divine truth." },
        { text: "For God so loved the world that he gave his only Son", reference: "John 3:16", context: "The heart of the Gospel - God's sacrificial love demonstrated through Jesus." },
        { text: "That whoever believes in him should not perish but have eternal life", reference: "John 3:16", context: "The universal offer of salvation through simple faith in Jesus Christ." },
        { text: "For God sent the Son into the world not to condemn the world", reference: "John 3:17", context: "God's gracious purpose in sending Jesus was salvation not judgment." },
        { text: "But that the world might be saved through him", reference: "John 3:17", context: "The redemptive mission of Christ to offer salvation to all." },
        { text: "I am the way the truth and the life", reference: "John 14:6", context: "Jesus' exclusive claim as the only path to God." },
        { text: "No one comes to the Father except through me", reference: "John 14:6", context: "The necessity of Christ for any relationship with God." },
        { text: "If you had known me you would have known my Father also", reference: "John 14:7", context: "The intimate relationship between Jesus and the Father." },
        { text: "From now on you do know him and have seen him", reference: "John 14:7", context: "Jesus revealing the Father through His own person and work." }
    ],
    "Matthew": [
        { text: "Blessed are the poor in spirit for theirs is the kingdom of heaven", reference: "Matthew 5:3", context: "The opening beatitude, blessing those who recognize their spiritual need." },
        { text: "Blessed are those who mourn for they shall be comforted", reference: "Matthew 5:4", context: "God's promise of comfort to those experiencing grief and loss." },
        { text: "Blessed are the meek for they shall inherit the earth", reference: "Matthew 5:5", context: "The counter-cultural blessing of gentle humility leading to ultimate reward." },
        { text: "Blessed are those who hunger and thirst for righteousness for they shall be satisfied", reference: "Matthew 5:6", context: "God's promise to those who deeply desire moral and spiritual integrity." },
        { text: "Blessed are the merciful for they shall receive mercy", reference: "Matthew 5:7", context: "The reciprocal blessing of showing and receiving compassion." },
        { text: "Blessed are the pure in heart for they shall see God", reference: "Matthew 5:8", context: "The blessing of spiritual purity leading to divine fellowship." },
        { text: "Blessed are the peacemakers for they shall be called sons of God", reference: "Matthew 5:9", context: "The blessing of those who actively work for reconciliation." },
        { text: "Blessed are those who are persecuted for righteousness sake for theirs is the kingdom of heaven", reference: "Matthew 5:10", context: "The blessing promised to those who suffer for their faith." },
        { text: "Love your enemies and pray for those who persecute you", reference: "Matthew 5:44", context: "Jesus' radical command to love even those who oppose us." },
        { text: "Bless those who curse you do good to those who hate you", reference: "Matthew 5:44", context: "Active love demonstrated toward adversaries, not passive tolerance." },
        { text: "Pray then like this Our Father who art in heaven", reference: "Matthew 6:9", context: "The model prayer Jesus taught, beginning with intimate relationship with God." },
        { text: "Hallowed be your name your kingdom come your will be done", reference: "Matthew 6:9-10", context: "Prioritizing God's glory and sovereign rule in prayer." },
        { text: "On earth as it is in heaven give us this day our daily bread", reference: "Matthew 6:10-11", context: "Praying for daily provision and alignment with God's will." },
        { text: "And forgive us our trespasses as we forgive those who trespass against us", reference: "Matthew 6:12", context: "The connection between receiving and extending forgiveness." },
        { text: "And lead us not into temptation but deliver us from evil", reference: "Matthew 6:13", context: "Prayer for divine guidance and protection from sin." },
        { text: "For yours is the kingdom and the power and the glory forever", reference: "Matthew 6:13", context: "Concluding praise acknowledging God's eternal sovereignty." },
        { text: "Seek first the kingdom of God and his righteousness", reference: "Matthew 6:33", context: "Jesus' priority principle for life - God's kingdom above all else." },
        { text: "And all these things shall be added to you", reference: "Matthew 6:33", context: "God's promise to provide for those who prioritize Him." },
        { text: "Therefore do not be anxious about tomorrow", reference: "Matthew 6:34", context: "Jesus' command to trust God with future uncertainties." },
        { text: "For tomorrow will be anxious for itself sufficient for the day is its own trouble", reference: "Matthew 6:34", context: "Living one day at a time, trusting God's daily provision." },
        { text: "Come to me all who labor and are heavy laden", reference: "Matthew 11:28", context: "Jesus' invitation to the weary and burdened to find rest in Him." },
        { text: "And I will give you rest", reference: "Matthew 11:28", context: "The promise of spiritual rest through relationship with Christ." },
        { text: "Take my yoke upon you and learn from me", reference: "Matthew 11:29", context: "The call to discipleship and learning from Christ's example." },
        { text: "For I am gentle and lowly in heart and you will find rest for your souls", reference: "Matthew 11:29", context: "Jesus' character description and the resulting soul rest." },
        { text: "For my yoke is easy and my burden is light", reference: "Matthew 11:30", context: "The gentle nature of Christ's requirements for His followers." },
        { text: "Go therefore and make disciples of all nations", reference: "Matthew 28:19", context: "The Great Commission - Jesus' final command to spread the Gospel." },
        { text: "Baptizing them in the name of the Father and of the Son and of the Holy Spirit", reference: "Matthew 28:19", context: "The Trinitarian formula for Christian baptism and initiation." },
        { text: "Teaching them to observe all that I have commanded you", reference: "Matthew 28:20", context: "The importance of teaching obedience to Christ's commands." },
        { text: "And behold I am with you always to the end of the age", reference: "Matthew 28:20", context: "Jesus' promise of His continual presence with His followers." }
    ],
    "Proverbs": [
        { text: "Trust in the Lord with all your heart and lean not on your own understanding", reference: "Proverbs 3:5", context: "The call to complete dependence on God's wisdom rather than human reasoning." },
        { text: "In all your ways acknowledge him and he will make straight your paths", reference: "Proverbs 3:6", context: "God's promise of guidance to those who consciously honor Him in all decisions." },
        { text: "The fear of the Lord is the beginning of wisdom", reference: "Proverbs 9:10", context: "True wisdom begins with reverence and awe of God." },
        { text: "And the knowledge of the Holy One is insight", reference: "Proverbs 9:10", context: "Deep understanding comes from knowing God personally." },
        { text: "Train up a child in the way he should go even when he is old he will not depart from it", reference: "Proverbs 22:6", context: "The importance of early spiritual formation and moral education." },
        { text: "The heart of man plans his way but the Lord establishes his steps", reference: "Proverbs 16:9", context: "The interplay between human planning and divine sovereignty." },
        { text: "A soft answer turns away wrath but a harsh word stirs up anger", reference: "Proverbs 15:1", context: "The power of gentle communication in conflict resolution." },
        { text: "Pride goes before destruction and a haughty spirit before a fall", reference: "Proverbs 16:18", context: "Warning against the spiritual danger of pride and arrogance." },
        { text: "Iron sharpens iron and one man sharpens another", reference: "Proverbs 27:17", context: "The value of mutual encouragement and accountability in relationships." },
        { text: "Where there is no guidance a people falls but in an abundance of counselors there is safety", reference: "Proverbs 11:14", context: "The wisdom of seeking multiple perspectives for major decisions." }
    ],
    "Catholic Theology": [
        { text: "That they may all be one just as you Father are in me and I in you that they also may be in us", reference: "John 17:21", context: "Jesus' High Priestly Prayer for the unity of all believers, emphasizing the visible, organic unity of the Church as a sign of divine truth." },
        { text: "That the world may believe that you have sent me", reference: "John 17:21", context: "The unity of the Church serves as a missionary witness to the world of Christ's saving mission." },
        { text: "The glory that you have given me I have given to them that they may be one even as we are one", reference: "John 17:22", context: "Christ shares His divine glory with the Church, establishing His mystical body as the vessel of divine life." },
        { text: "I in them and you in me that they may become perfectly one", reference: "John 17:23", context: "The goal of Christian unity is perfect communion with the Trinity, affirming the Catholic Church's visible structure." },
        { text: "So the world may know that you sent me and loved them even as you loved me", reference: "John 17:23", context: "The Father's love for Christ is mirrored in Christ's love for the Church, prefiguring the communion of saints." },
        { text: "You are Peter and on this rock I will build my Church", reference: "Matthew 16:18", context: "Jesus' foundational declaration establishing Peter as the visible head of the Church, the 'rock' upon which Christ builds His mystical body." },
        { text: "And the gates of hell shall not prevail against it", reference: "Matthew 16:18", context: "The divine promise of the Church's indefectibility and protection from error throughout history." },
        { text: "I will give you the keys of the kingdom of heaven", reference: "Matthew 16:19", context: "The papal primacy and the universal authority of the Bishop of Rome over the entire Church." },
        { text: "Whatever you bind on earth shall be bound in heaven and whatever you loose on earth shall be loosed in heaven", reference: "Matthew 16:19", context: "The divinely ordained authority of the Pope and bishops to teach, govern, and sanctify with infallible power." },
        { text: "Stand firm and hold to the traditions you were taught by us whether by word of mouth or by letter", reference: "2 Thessalonians 2:15", context: "The equal authority of Sacred Tradition and Sacred Scripture as sources of divine revelation, countering sola scriptura." },
        { text: "The Church of the living God is the pillar and foundation of truth", reference: "1 Timothy 3:15", context: "The Catholic Church's divinely appointed role as the authoritative interpreter of divine revelation and guardian of apostolic faith." },
        { text: "If you forgive the sins of any they are forgiven them if you retain the sins of any they are retained", reference: "John 20:22-23", context: "Jesus' institution of the Sacrament of Reconciliation, conferring on the Apostles and their successors the power to absolve sins." },
        { text: "Receive the Holy Spirit If you forgive the sins of any they are forgiven", reference: "John 20:21-23", context: "The transmission of sacramental authority from Christ through the Apostles to the bishops and priests of the Catholic Church." },
        { text: "And when they had appointed presbyters for them in every church and had prayed with fasting they commended them to the Lord", reference: "Acts 14:23", context: "The apostolic origin of the hierarchy, confirming the early Church's organized structure and apostolic succession." },
        { text: "You see that a person is justified by works and not by faith alone", reference: "James 2:24", context: "The inseparable connection between faith and works in the Catholic understanding of salvation, countering Protestant sola fide." },
        { text: "Whatever you bind on earth shall be bound in heaven and whatever you loose on earth shall be loosed in heaven", reference: "Matthew 18:18", context: "The Church's authority granted by Christ to teach, judge, and govern in matters of faith and morals with divine assistance." },
        { text: "I have prayed for you that your faith may not fail and when you have turned again strengthen your brethren", reference: "Luke 22:32", context: "Jesus' specific prayer for Peter's unique role as the unifier and strengthener of the entire apostolic college and the Church." },
        { text: "Simon Simon behold Satan has asked to sift you like wheat but I have prayed for you that your faith may not fail", reference: "Luke 22:31-32", context: "The divine protection of Peter's office and the foundational role of the papacy in maintaining Church unity." },
        { text: "Unless you eat the flesh of the Son of Man and drink his blood you have no life in you", reference: "John 6:53", context: "Jesus' clear teaching on the Real Presence of Christ in the Eucharist as the source and summit of the Christian life." },
        { text: "Whoever eats my flesh and drinks my blood has eternal life and I will raise him on the last day", reference: "John 6:54", context: "The promise of everlasting life through worthy reception of the Blessed Sacrament, central to Catholic theology." },
        { text: "For my flesh is true food and my blood is true drink", reference: "John 6:55", context: "Christ's literal affirmation of the Eucharist as His true body and blood, distinguishing Catholic doctrine from symbolic interpretations." },
        { text: "Whoever eats of this bread will live forever and the bread that I will give is my flesh for the life of the world", reference: "John 6:51", context: "The sacrificial nature of the Eucharist as the living bread that nourishes the faithful to eternal life." },
        { text: "He who eats my flesh and drinks my blood abides in me and I in him", reference: "John 6:56", context: "The mystical communion between Christ and the believer through the Eucharist, the source of grace and sanctity." },
        { text: "As the living Father sent me and I live because of the Father so whoever eats me he also will live because of me", reference: "John 6:57", context: "The life-giving power of the Eucharist flowing from the Father's sending of the Son and the Son's submission to the Father's will." }
    ]
};

// Game state
let gameState = {
    mode: 'timer', // 'timer', 'words'
    words: [],
    letters: [],
    currentWordIndex: 0,
    currentLetterIndex: 0,
    correctLetters: 0,
    incorrectLetters: 0,
    startTime: null,
    timer: null,
    caretTimer: null,
    isTestActive: false,
    timeLimit: 60,
    wordLimit: 50,
    timeRemaining: 60,
    currentVerse: null,
    currentVerseIndex: 0,
    verses: [],
    selectedBook: null,
    selectedBookName: null
};

function selectRandomBook() {
    const books = Object.keys(bibleBooks);
    const randomIndex = Math.floor(Math.random() * books.length);
    gameState.selectedBook = bibleBooks[books[randomIndex]];
    gameState.selectedBookName = books[randomIndex];
}

function generateConsecutiveVerses(count = 50) {
    const verses = gameState.selectedBook;
    const startIndex = Math.floor(Math.random() * (verses.length - count / 3)); // Start point, assuming 3 words per verse average
    const selectedVerses = [];
    
    for (let i = 0; i < Math.min(count / 3, verses.length - startIndex); i++) {
        selectedVerses.push(verses[startIndex + i]);
    }
    
    return selectedVerses;
}

function verseToWords(verse) {
    return verse.split(/\s+/);
}

function generateRandomWords(count = 50) {
    // Select a random book if not already selected
    if (!gameState.selectedBook) {
        selectRandomBook();
    }
    
    const selectedVerses = generateConsecutiveVerses(Math.ceil(count / 8)); // Average verse has ~8 words
    gameState.verses = selectedVerses;
    gameState.currentVerseIndex = 0;
    gameState.currentVerse = selectedVerses[0];
    
    const allWords = [];
    selectedVerses.forEach(verse => {
        const words = verseToWords(verse.text);
        allWords.push(...words);
    });
    
    return allWords.slice(0, count);
}

function renderWords(wordList) {
    const wordsContainer = document.querySelector('.words');
    wordsContainer.innerHTML = '';
    
    wordList.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        
        word.split('').forEach(letter => {
            const letterSpan = document.createElement('letter');
            letterSpan.textContent = letter;
            wordDiv.appendChild(letterSpan);
        });
        
        wordsContainer.appendChild(wordDiv);
    });
}

function updateVerseReference() {
    if (gameState.currentVerse) {
        // For creeds and prayers, show the order instead of reference
        if (gameState.selectedBookName === "Nicene Creed") {
            const verseNum = gameState.currentVerse.reference.split(" ")[1];
            verseReferenceEl.textContent = `Nicaea ${verseNum}`;
        } else if (gameState.selectedBookName === "Apostles Creed") {
            const verseNum = gameState.currentVerse.reference.split(" ")[1];
            verseReferenceEl.textContent = `Apostles ${verseNum}`;
        } else if (gameState.selectedBookName === "Hail Mary" || gameState.selectedBookName === "Glory Be") {
            verseReferenceEl.textContent = gameState.selectedBookName;
        } else {
            verseReferenceEl.textContent = gameState.currentVerse.reference;
        }
    } else {
        verseReferenceEl.textContent = '-';
    }
}

function updateCurrentVerse() {
    // Track which verse we're currently typing
    let wordsTyped = 0;
    for (let i = 0; i <= gameState.currentWordIndex; i++) {
        if (i === gameState.currentWordIndex) {
            wordsTyped += gameState.currentLetterIndex;
        } else {
            wordsTyped += gameState.words[i].querySelectorAll('letter').length;
        }
    }
    
    // Find which verse we're in based on words typed
    let cumulativeWords = 0;
    for (let i = 0; i < gameState.verses.length; i++) {
        const verseWords = verseToWords(gameState.verses[i].text).length;
        if (wordsTyped < cumulativeWords + verseWords) {
            gameState.currentVerse = gameState.verses[i];
            gameState.currentVerseIndex = i;
            break;
        }
        cumulativeWords += verseWords;
    }
    
    updateVerseReference();
}

function initializeTest() {
    // Reset game state
    gameState.currentWordIndex = 0;
    gameState.currentLetterIndex = 0;
    gameState.correctLetters = 0;
    gameState.incorrectLetters = 0;
    gameState.isTestActive = false;
    gameState.timeRemaining = gameState.timeLimit;
    
    // Show the appropriate config based on mode
    document.getElementById('timer-config').style.display = gameState.mode === 'timer' ? 'block' : 'none';
    document.getElementById('words-config').style.display = gameState.mode === 'words' ? 'block' : 'none';
    
    // Generate words based on mode
    let wordList = [];
    if (gameState.mode === 'words') {
        wordList = generateRandomWords(gameState.wordLimit);
    } else if (gameState.mode === 'timer') {
        wordList = generateRandomWords(100); // Generate more words for timer mode
    }
    
    renderWords(wordList);
    
    // Update game state
    const wordElements = document.querySelectorAll('.word');
    gameState.words = Array.from(wordElements);
    gameState.letters = gameState.words.flatMap(word => Array.from(word.querySelectorAll('letter')));
    
    resetCaret();
    updateStats();
    updateCurrentVerse();
    updateWordHighlights();
}

function addMoreWords() {
    // Get consecutive verses from the same book, continuing from where we left off
    const lastVerseIndex = gameState.verses.length > 0 ? 
        gameState.selectedBook.indexOf(gameState.verses[gameState.verses.length - 1]) : -1;
    
    const newVerses = [];
    const bookVerses = gameState.selectedBook;
    
    // Add the next consecutive verses from the same book
    for (let i = lastVerseIndex + 1; i < Math.min(lastVerseIndex + 6, bookVerses.length); i++) {
        if (i >= 0 && bookVerses[i]) {
            newVerses.push(bookVerses[i]);
        }
    }
    
    // If we've reached the end of the book, loop back to the beginning
    if (newVerses.length === 0) {
        for (let i = 0; i < Math.min(6, bookVerses.length); i++) {
            newVerses.push(bookVerses[i]);
        }
    }
    
    // Add new verses to game state
    gameState.verses.push(...newVerses);
    
    // Convert verses to words
    const newWords = [];
    newVerses.forEach(verse => {
        const words = verseToWords(verse.text);
        newWords.push(...words);
    });
    
    const wordsContainer = document.querySelector('.words');
    
    newWords.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        
        word.split('').forEach(letter => {
            const letterSpan = document.createElement('letter');
            letterSpan.textContent = letter;
            wordDiv.appendChild(letterSpan);
        });
        
        wordsContainer.appendChild(wordDiv);
    });
    
    // Update game state
    const wordElements = document.querySelectorAll('.word');
    gameState.words = Array.from(wordElements);
    gameState.letters = gameState.words.flatMap(word => Array.from(word.querySelectorAll('letter')));
}

function resetCaret() {
    document.querySelectorAll('caret').forEach(c => c.remove());
    if (gameState.letters[0]) {
        gameState.letters[0].insertAdjacentHTML('beforebegin', '<caret style="opacity: 1;"></caret>');
    }
}

function updateCaret() {
    document.querySelectorAll('caret').forEach(c => c.remove());
    const currentWord = gameState.words[gameState.currentWordIndex];
    if (currentWord) {
        const letterElements = currentWord.querySelectorAll('letter');
        const currentLetter = letterElements[gameState.currentLetterIndex];
        if (currentLetter) {
            currentLetter.insertAdjacentHTML('afterend', '<caret style="opacity: 1;"></caret>');
        } else {
            // after last letter of word
            currentWord.insertAdjacentHTML('beforeend', '<caret style="opacity: 1;"></caret>');
        }
    }
}

function startTimer() {
    gameState.startTime = Date.now();
    gameState.isTestActive = true;
    
    if (gameState.mode === 'timer') {
        // Countdown timer
        gameState.timer = setInterval(() => {
            gameState.timeRemaining--;
            updateTime();
            if (gameState.timeRemaining <= 0) {
                endTest();
            }
        }, 1000);
    } else {
        // Regular timer
        gameState.timer = setInterval(updateTime, 100);
    }
    
    // Caret blinking
    gameState.caretTimer = setInterval(() => {
        const caret = document.querySelector('caret');
        if (caret) caret.style.opacity = caret.style.opacity === '1' ? '0' : '1';
    }, 500);
}

function updateTime() {
    if (gameState.mode === 'timer') {
        timeEl.textContent = `${gameState.timeRemaining}s`;
        
        // Add warning effect when time is running out
        if (gameState.timeRemaining <= 5) {
            timeEl.parentElement.style.background = 'rgba(239, 68, 68, 0.2)';
            timeEl.parentElement.style.borderColor = 'rgba(239, 68, 68, 0.5)';
        }
    } else {
        const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
        timeEl.textContent = `${elapsed}s`;
        
        // Add subtle pulse effect to time stat
        if (elapsed % 10 === 0 && elapsed > 0) {
            timeEl.parentElement.style.transform = 'scale(1.05)';
            setTimeout(() => {
                timeEl.parentElement.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

function updateStats() {
    let elapsedMinutes;
    if (gameState.mode === 'timer') {
        elapsedMinutes = (gameState.timeLimit - gameState.timeRemaining) / 60;
    } else {
        elapsedMinutes = (Date.now() - gameState.startTime) / 60000;
    }
    
    const wpm = Math.round((gameState.correctLetters / 5) / elapsedMinutes) || 0;
    wpmEl.textContent = wpm;

    const totalTyped = gameState.correctLetters + gameState.incorrectLetters;
    const accuracy = totalTyped === 0 ? 100 : Math.round((gameState.correctLetters / totalTyped) * 100);
    accuracyEl.textContent = `${accuracy}%`;
}

function updateWordHighlights() {
    gameState.words.forEach((word, index) => {
        word.classList.remove('active');
        word.style.opacity = '';
        if (index < gameState.currentWordIndex) {
            word.style.opacity = '0.7';
        } else if (index === gameState.currentWordIndex) {
            word.classList.add('active');
            word.style.opacity = '1';
        } else {
            word.style.opacity = '0.5';
        }
    });
}

function handleKeydown(e) {
    if (e.key === 'Escape' || e.key === 'Tab') {
        e.preventDefault();
        resetTest();
        return;
    }

    if (!gameState.isTestActive && e.key.length === 1 && e.key !== ' ') {
        startTimer();
    }

    const currentWord = gameState.words[gameState.currentWordIndex];
    if (!currentWord) return;
    const letterElements = currentWord.querySelectorAll('letter');

    if (e.key === ' ') {
        e.preventDefault();
        if (gameState.currentLetterIndex >= letterElements.length) {
            // word completed, move to next
            gameState.currentWordIndex++;
            gameState.currentLetterIndex = 0;
            
            // Check if test should end based on mode
            if (gameState.mode === 'words' && gameState.currentWordIndex >= gameState.words.length) {
                endTest();
                return;
            }
            
            // Add more words if we're near the end and in timer mode
            if (gameState.mode === 'timer' && gameState.currentWordIndex >= gameState.words.length - 10) {
                addMoreWords();
            }
            
            updateWordHighlights();
            updateCaret();
            updateCurrentVerse();
        }
    } else if (e.key === 'Backspace') {
        if (gameState.currentLetterIndex > 0) {
            gameState.currentLetterIndex--;
            letterElements[gameState.currentLetterIndex].className = '';
            gameState.correctLetters = Math.max(0, gameState.correctLetters - 1);
        } else if (gameState.currentWordIndex > 0) {
            gameState.currentWordIndex--;
            const prevWord = gameState.words[gameState.currentWordIndex];
            const prevLetters = prevWord.querySelectorAll('letter');
            gameState.currentLetterIndex = prevLetters.length;
        }
        updateCaret();
        updateStats();
        updateWordHighlights();
        updateCurrentVerse();
        updateCurrentVerse();
    } else if (e.key.length === 1 && gameState.currentLetterIndex < letterElements.length) {
        const expected = letterElements[gameState.currentLetterIndex].textContent;
        const typed = e.key;
        if (typed === expected) {
            letterElements[gameState.currentLetterIndex].classList.add('correct');
            gameState.correctLetters++;
        } else {
            letterElements[gameState.currentLetterIndex].classList.add('incorrect');
            gameState.incorrectLetters++;
        }
        gameState.currentLetterIndex++;
        
        // Check if this was the last letter of the last word in Words mode
        if (gameState.mode === 'words' && 
            gameState.currentWordIndex === gameState.words.length - 1 && 
            gameState.currentLetterIndex >= letterElements.length) {
            endTest();
            return;
        }
        
        updateCaret();
        updateStats();
        updateCurrentVerse();
    }
}

function endTest() {
    clearInterval(gameState.timer);
    clearInterval(gameState.caretTimer);
    gameState.isTestActive = false;
    inputField.blur();
    
    // Show results modal
    const modal = document.getElementById('results-modal');
    const finalWpm = document.getElementById('final-wpm');
    const finalAccuracy = document.getElementById('final-accuracy');
    const finalTime = document.getElementById('final-time');
    
    finalWpm.textContent = wpmEl.textContent;
    finalAccuracy.textContent = accuracyEl.textContent;
    
    let timeText;
    if (gameState.mode === 'timer') {
        timeText = `${gameState.timeLimit}s`;
    } else {
        timeText = timeEl.textContent;
    }
    finalTime.textContent = timeText;
    
    // Reset context view
    document.getElementById('results-content').style.display = 'block';
    document.getElementById('verse-context').style.display = 'none';
    
    modal.style.display = 'flex';
}

function resetTest() {
    clearInterval(gameState.timer);
    clearInterval(gameState.caretTimer);
    
    // Reset stats display
    timeEl.textContent = '0s';
    wpmEl.textContent = '0';
    accuracyEl.textContent = '100%';
    verseReferenceEl.textContent = '-';
    timeEl.parentElement.style.background = '';
    timeEl.parentElement.style.borderColor = '';
    
    // Reset book selection for new test
    gameState.selectedBook = null;
    gameState.selectedBookName = null;
    
    // Hide results modal and context
    document.getElementById('results-modal').style.display = 'none';
    document.getElementById('verse-context').style.display = 'none';
    
    // Generate new random verses
    initializeTest();
    inputField.focus();
}

// Mode selection handlers
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        gameState.mode = btn.dataset.mode;
        
        // Hide all config sections
        document.getElementById('timer-config').style.display = 'none';
        document.getElementById('words-config').style.display = 'none';
        
        // Show relevant config section
        if (gameState.mode === 'timer') {
            document.getElementById('timer-config').style.display = 'block';
            gameState.timeLimit = parseInt(timerDuration.value);
        } else if (gameState.mode === 'words') {
            document.getElementById('words-config').style.display = 'block';
            gameState.wordLimit = parseInt(wordsCount.value);
        }
        
        resetTest();
    });
});

// Config change handlers
timerDuration.addEventListener('change', () => {
    gameState.timeLimit = parseInt(timerDuration.value);
    resetTest();
});

wordsCount.addEventListener('change', () => {
    gameState.wordLimit = parseInt(wordsCount.value);
    resetTest();
});

function showVerseContext() {
    const contextEl = document.getElementById('verse-context');
    const resultsEl = document.getElementById('results-content');
    const bookTitle = document.getElementById('context-book-title');
    const verseRef = document.getElementById('context-verse-reference');
    const description = document.getElementById('context-description');
    
    // Get the current verse context
    const currentVerseData = gameState.currentVerse;
    if (currentVerseData && currentVerseData.context) {
        // Special titles for creeds and prayers
        let displayTitle = gameState.selectedBookName;
        if (gameState.selectedBookName === "Nicene Creed") {
            displayTitle = "First Ecumenical Council - Nicaea (325 AD)";
        } else if (gameState.selectedBookName === "Apostles Creed") {
            displayTitle = "Apostles Creed - Ancient Baptismal Formula (2nd Century)";
        } else if (gameState.selectedBookName === "Hail Mary") {
            displayTitle = "The Angelic Salutation - Luke 1:28, 1:42";
        } else if (gameState.selectedBookName === "Glory Be") {
            displayTitle = "The Trinitarian Doxology - Ancient Church Prayer";
        }
        
        bookTitle.textContent = displayTitle;
        verseRef.textContent = currentVerseData.reference;
        description.textContent = currentVerseData.context;
    }
    
    // Hide results, show context
    resultsEl.style.display = 'none';
    contextEl.style.display = 'block';
}

function backToResults() {
    document.getElementById('verse-context').style.display = 'none';
    document.getElementById('results-content').style.display = 'block';
}

// Event listeners
document.addEventListener('keydown', handleKeydown);
document.addEventListener('click', () => inputField.focus());
document.getElementById('restart-btn').addEventListener('click', resetTest);
document.getElementById('learn-more-btn').addEventListener('click', showVerseContext);
document.getElementById('back-to-results').addEventListener('click', backToResults);

// Initialize
initializeTest();
inputField.focus();