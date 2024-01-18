import React, { useState } from 'react';
import FeedbackOptions from './Feedback/FeedbackOptions';
import Statistics from './Feedback/Statistics';
import Section from './Feedback/Section';
import Notification from './Feedback/Notification';

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = (type) => {
    setFeedback({ ...feedback, [type]: feedback[type] + 1 });
  };

  const countTotalFeedback = () => {
    return feedback.good + feedback.neutral + feedback.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((feedback.good / total) * 100) : 0;
  };

  const totalFeedback = countTotalFeedback();

  return (
    <div>
      <Section title="Please leave your feedback">
        <FeedbackOptions options={Object.keys(feedback)} onLeaveFeedback={handleFeedback} />
      </Section>
      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics 
            good={feedback.good} 
            neutral={feedback.neutral} 
            bad={feedback.bad} 
            total={totalFeedback} 
            positivePercentage={countPositiveFeedbackPercentage()} 
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;