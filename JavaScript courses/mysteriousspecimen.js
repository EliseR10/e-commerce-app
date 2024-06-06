// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  //console.log(returnRandBase(['A', 'B', 'C']))
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand;
  }
  console.log(mockUpStrand());
  
  //Factory function
  const pAequorFactory = (specimenNum, dna) => {
    const originalDNA = dna.map((x) => x);
    const newSpecimen = {
      specimenNum: specimenNum,
      dna: dna,
      mutate() {
        newSpecimen.dna = mockUpStrand();
        return newSpecimen.dna;
      },
      compareDNA() {
        let numOfMatch = 0;
        for (let i = 0; i < originalDNA.length; i++){
          if (originalDNA[i] === newSpecimen.dna[i]) {
            numOfMatch = numOfMatch + 1;
          }
          const compareResult = (numOfMatch /15) * 100
          return `${compareResult}%, ${numOfMatch} matches`;
        }
      },
      willLikelySurvive() {
        let cInt = 0;
        let gInt = 0;
        let noMatch = 0;
        for (let z = 0; z < newSpecimen.dna.length; z++) {
          if (newSpecimen.dna[z] === 'C') {
            cInt = cInt + 1;
          } else if (newSpecimen.dna[z] === 'G') {
            gInt = gInt +1;
          } else {
            noMatch = noMatch +1;
          }
        }
        const theMatches = cInt + gInt
        const surviveResult = (theMatches / 15) * 100;
        let willLive = '';
        if (surviveResult >= 60) {
          willLive = 'live';
        } else {
          willLive = 'die';
        }
        return `This specimen has a ${surviveResult}% survival rate. ${theMatches} matches were found. The specimen will ${willLive}.`;
      }
    };
    return newSpecimen;
  };
  
  const newObject1 = pAequorFactory(1, mockUpStrand());
  console.log(newObject1.dna);
  newObject1.mutate();
  console.log(newObject1.dna)
  console.log(newObject1.compareDNA());
  console.log(newObject1.willLikelySurvive())
  
  //30 Instances of our specimen object 
  const make30Copes = () => {
    let myFarm = [];
    for (let i = 0; i < 30; i++){
      let pAequor = pAequorFactory([i], mockUpStrand())
      myFarm.push(pAequor);
    }
    return myFarm;
  }
  
  const farm = make30Copes()
  console.log(farm.length)
  
  
  
  
  