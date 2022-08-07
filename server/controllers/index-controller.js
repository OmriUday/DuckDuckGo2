const fetch = require('node-fetch');

const baseURL = 'https://api.duckduckgo.com/?format=json&q=';

const dataFromTopic = (topics, topicsResult = []) => {
  topics.map((topic) => {
    if (topic.FirstURL) {
      topicsResult.push({
        title: topic.FirstURL.split('/').pop(),
        link: topic.FirstURL,
      });
    } else if (topic.Topics) {
      dataFromTopic(topic.Topics, topicsResult);
    } else {
      return;
    }
  });

  return topicsResult.filter((topic) => topic);
};

const getSearchResult = async (req, res, next) => {
  const { searchText } = req.params;
  const limit = parseInt(req.query.limit);
  const offset = parseInt(req.query.offset);

  if (!searchText) {
    res.status(400).send('Search field is empty');
    return;
  }

  try {
    const result = await fetch(`${baseURL}${searchText}`);
    const data = await result.json();

    const topicsResult = dataFromTopic(data['RelatedTopics'], []);
    const topicsResultSize = topicsResult.length;
    topicsResult.map((topic, i) => {
      topic.id = i + 1;
    });
    let indexEnd;
    indexEnd =
      offset + limit < topicsResultSize ? offset + limit : topicsResultSize;

    res.json({
      result: topicsResult.slice(offset, indexEnd),
      originalResultSize: topicsResultSize,
    });
  } catch (error) {
    res.status(400).send('Error, failed to fetch!' + error);
  }
};

exports.getSearchResult = getSearchResult;
