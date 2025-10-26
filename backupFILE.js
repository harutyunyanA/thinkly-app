async submitQuiz(req, res) {

    const userAnswers = req.body?.answers;

    if (!Array.isArray(userAnswers)) {
      return res.status(400).send({ message: "Answers must be array" });
    }

    for (const ans of userAnswers) {
      if (!ans.questionId || !Array.isArray(ans.selected)) {
        return res.status(400).send({
          message: "Each answer must have questionId and selected array",
        });
      }
    }
    
    console.log(userAnswers)
    const { id: quizId } = req.params;
    const userId = req.user?._id;

    const quiz = await Quiz.findById(quizId).populate("questions");
    const questions = quiz.questions;

    const attempt = new Attempt({
      quiz: quizId,
      score: 0,
      correctCount: 0,
      totalQuestions: quiz.questions.length,
    });

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      const userQuestion = userAnswers.find(
        (u) => u.questionId === question._id.toString()
      );

      if (!userQuestion) continue; ///user missed the question

      ///////////assembling array of correct answers's ID
      const correctAnswers = [];

      for (let j = 0; j < question.answers.length; j++) {
        if (question.answers[j].isCorrect) {
          correctAnswers.push(question.answers[i]._id);
        }
      }





    }

    if (userId) {
      attempt.user = userId;
      await attempt.save();
    }

    res.send(questions);
    // const attempt = new Attempt({
    //   quiz: quizId,
    //   user:

    // })
  }