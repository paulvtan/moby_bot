using System;
using System.Threading.Tasks;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Connector;
using System.Threading;

namespace moby_bot.Dialogs
{
    [Serializable]
    public class RootDialog : IDialog<object>
    {
        public Task StartAsync(IDialogContext context)
        {
            context.Wait(MessageReceivedAsync);

            return Task.CompletedTask;
        }

        private async Task MessageReceivedAsync(IDialogContext context, IAwaitable<object> result)
        {
            var activity = await result as Activity;

            //Call GetQnaReply to get the result
            QnAMakerResult QnaMakeReply = QnaMaker.GetQnaReply(activity);

            //Reply to user
            string QnaAnswer = QnaMakeReply.Answer;
            await context.PostAsync(QnaAnswer.Substring(2, QnaAnswer.Length - 2));


            //2nd Level Reply
            string scenarioCode = QnaAnswer.Substring(0, 2);
            switch (scenarioCode)
            {
                case "11":
                    Thread.Sleep(3000);
                    await context.PostAsync("Would you like me to help you allocate this transaction to the right account?");
                    break;
            }

            context.Wait(MessageReceivedAsync);
        }
    }
}