// helper function
// surveyResponse is an object with the questions as keys, e.g 'people_planet'
// and answers as values, being one of [0, 1, 0.5]
function _getMatchingScore(surveyResponse, charity) {
  var score = 0;
  var surveyQuestions = Object.keys(surveyResponse);
  var index;
  for (index = 0; index < surveyQuestions.length; index++) {
    var question = surveyQuestions[index];
    var preference = surveyResponse[question];
    var comparison = charity[question];
    if ((preference < 0.5 && comparison < 0.5) ||
        (preference > 0.5 && comparison > 0.5)) score++;
  }

  return score;
}

// call with an array of available charities
function getRecommendations(surveyResponse, charities) {
  var matchingScores = [];
  var maxScore = 0;
  var recommendedCharities = [];
  var index;
  for (index = 0; index < charities.length; index++) {
    var charity = charities[index];
    var score = _getMatchingScore(surveyResponse, charity);
    matchingScores[index] = score;
    if (score > maxScore) {
      maxScore = score;
      // overwrite previous recommendation, if any
      recommendedCharities = [charity.id];
    } else if (score === maxScore) {
      recommendedCharities.push(charity.id);
    }
  }

  return recommendedCharities;
}


// simple tests
var surveySample = {
  people_planet: 0,
  stories_metrics: 1,
  impact_overhead: 0,
};

var charityMatch3a = {
  id: '3a',
  username: 'against_malaria_foundation',
  display_name: 'Against Malaria Foundation',
  category: 'aid',
  logo: 'against_malaria_foundation-logo.png',
  card_description: 'Lorem ipsum',
  about_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  people_planet: 0,
  stories_metrics: 1,
  impact_overhead: 0,
  give_well: 'Top charity',
  charity_navigator: 'Not rated (nontrivial fundraising expenses)',
  impact_metric: '$2,838 per saved life',
  impact_unit_price: 2838,
  impact_unit: '$2,838 per saved life',
};

var charityMatch3b = {
  id: '3b',
  username: 'against_malaria_foundation',
  display_name: 'Against Malaria Foundation',
  category: 'aid',
  logo: 'against_malaria_foundation-logo.png',
  card_description: 'Lorem ipsum',
  about_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  people_planet: 0,
  stories_metrics: 1,
  impact_overhead: 0,
  give_well: 'Top charity',
  charity_navigator: 'Not rated (nontrivial fundraising expenses)',
  impact_metric: '$2,838 per saved life',
  impact_unit_price: 2838,
  impact_unit: '$2,838 per saved life',
};

var charityMatch1 = {
  id: '1',
  username: 'red_cross',
  display_name: 'Red Cross',
  category: 'aid',
  logo: 'red_cross-logo.png',
  header_image: 'red_cross-header.png',
  card_description: 'Lorem ipsum',
  about_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  people_planet: 1,
  stories_metrics: 0,
  impact_overhead: 0,
  give_well: 'Top charity',
  charity_navigator: 'Not rated (<7 years old)',
  impact_metric: '$1,000 helps a household in acute poverty',
  impact_unit_price: 1000,
  impact_unit: 'households in poverty helped',
};

var charities = [charityMatch3a, charityMatch1, charityMatch3b];

console.log('should return 3: ', _getMatchingScore(surveySample, charityMatch3a) === 3);
console.log('should return 1: ', _getMatchingScore(surveySample, charityMatch1) === 1);
console.log('should return array with 3a and 3b: ', getRecommendations(surveySample, charities).length === 2, getRecommendations(surveySample, charities));
var surveySample2 = {
  people_planet: 1,
  stories_metrics: 0,
  impact_overhead: 0,
};
console.log('should return array with 1: ', getRecommendations(surveySample2, charities).length === 1, getRecommendations(surveySample2, charities));
