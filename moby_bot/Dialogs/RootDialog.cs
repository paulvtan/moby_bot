using System;
using System.Threading.Tasks;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Connector;
using System.Threading;
using Newtonsoft.Json;
using AdaptiveCards;
using System.Collections.Generic;

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

            //Transform Yes to scenario code
            switch (activity.Text)
            {
                case " Yes":
                    activity.Text = "+12";
                    break;
                case "Yes ":
                    activity.Text = "+16";
                    break;
                case " Yes ":
                    activity.Text = "+23";
                    break;
                case "Call":
                    activity.Text = "+25";
                    break;
            }

            //Call GetQnaReply to get the result
            QnAMakerResult qnaMakeReply = QnaMaker.GetQnaReply(activity);
            string qnaAnswer = qnaMakeReply.Answer;

            //Reply to user if the reply doesn't just contain code otherwise go to level 2
            if (qnaAnswer.Length > 2)
            {
                await context.PostAsync(qnaAnswer.Substring(2, qnaAnswer.Length - 2));
            }
            //-----------------------------------------------------


            //2nd Level card Reply
            string scenarioCode = qnaAnswer.Substring(0, 2);
            Activity replyToUser;
            switch (scenarioCode)
            {
                case "11":
                    Thread.Sleep(3000);
                    replyToUser = createCardActivity(activity, " Yes", "No", "Would you like me to help you allocate this transaction to the right account?", 12);
                    await context.PostAsync(replyToUser);
                    break;

                case "13":
                    replyToUser = createCardActivity(activity, "Income", "Expense", "Was this an income or an expense?", 13);
                    await context.PostAsync(replyToUser);
                    break;

                case "16":
                    replyToUser = createCardActivity(activity, "Yes ", "No", "Sounds like this is an 'Electricity & Gas' expense.\n\nWould you like me to allocate this transaction to the 'Electricity & Gas' expense account?", 13);
                    await context.PostAsync(replyToUser);
                    break;
                case "21":
                    System.Threading.Thread.Sleep(2000);
                    await context.PostAsync("You usually sell 30% more coffee on rainy days than usual, but it looks like stocks are running low.");
                    System.Threading.Thread.Sleep(2000);
                    replyToUser = createCardActivity(activity, " Yes ", "No", "Would you like me to order 5 more bags coffee beans for tomorrow morning?", 13);
                    await context.PostAsync(replyToUser);
                    break;
                case "24":
                    replyToUser = createCardActivity(activity, "Call", "Dismiss", "It looks like you usually need 3 workers on shift on a rainy day, but there's only 2 on shift tomorrow. Carol is available tomorrow, would you like to call her in?", 13);
                    await context.PostAsync(replyToUser);
                    break;
            }

            context.Wait(MessageReceivedAsync);
        }


        //Create Hero Yes and No card
        public static Activity createCardActivity(Activity activity, string choice1, string choice2, string text, int scenarioNo)
        {
            var heroCard = new HeroCard
            {
                Text = text,
                Buttons = new List<CardAction> { new CardAction("imBack", choice1, value: choice1), new CardAction("imBack", choice2, value: choice2) }
            };
            Activity replyToConversation = activity.CreateReply();
            // Create the attachment.
            Attachment attachment = heroCard.ToAttachment();
            replyToConversation.Attachments.Add(attachment);
            return replyToConversation;
        }
    }
}