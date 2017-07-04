using System;
using System.Threading.Tasks;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Connector;

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

            context.Wait(MessageReceivedAsync);
        }
    }
}