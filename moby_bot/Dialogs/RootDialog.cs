using System;
using System.Threading.Tasks;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Connector;
using System.Threading;
using Newtonsoft.Json;
using AdaptiveCards;

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

            //Test Adaptive Card
            var card = new AdaptiveCard();
            card.Body.Add(new TextBlock()
            {
                Text = "Would you like me to help you allocate this transaction to the right account.",
            });

            var json = JsonConvert.SerializeObject(card);

            Activity replyToConversation = activity.CreateReply("Card");
            // Create the attachment.
            Attachment attachment = new Attachment()
            {
                ContentType = AdaptiveCard.ContentType,
                Content = card
            };
            replyToConversation.Attachments.Add(attachment);
            await context.PostAsync(replyToConversation);
            //-----------------------------------------------------


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