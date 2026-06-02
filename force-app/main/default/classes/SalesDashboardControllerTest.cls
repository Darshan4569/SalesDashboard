@IsTest
private class SalesDashboardControllerTest {

    @IsTest
    static void testDashboardData() {

        Account acc = new Account(
            Name = 'Test Account'
        );
        insert acc;

        Opportunity opp1 = new Opportunity(
            Name = 'Open Opportunity',
            StageName = 'Prospecting',
            CloseDate = Date.today().addDays(30),
            Amount = 5000,
            AccountId = acc.Id
        );

        Opportunity opp2 = new Opportunity(
            Name = 'Won Opportunity',
            StageName = 'Closed Won',
            CloseDate = Date.today(),
            Amount = 10000,
            AccountId = acc.Id
        );

        insert new List<Opportunity>{opp1, opp2};

        Test.startTest();

        SalesDashboardController.DashboardWrapper result =
            SalesDashboardController.getDashboardData(
                null,
                null,
                null,
                null
            );

        Test.stopTest();

        System.assertNotEquals(null, result);
        System.assertEquals(1, result.openOpportunities);
        System.assertEquals(1, result.wonDeals);
        System.assertEquals(15000, result.pipelineAmount);
    }
}