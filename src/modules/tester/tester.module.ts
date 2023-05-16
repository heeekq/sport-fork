import { Global, Injectable, Module } from '@nestjs/common';
import { TesterService } from './tester.service';
import { TesterController } from './tester.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tester, TesterSchema } from './tester.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TesterAService } from './tester.a.service';
import { TesterBService } from './tester.b.service';
import { AuxiliaryService } from '../auxiliary/auxiliary.service';
import { AuxiliaryModule } from '../auxiliary/auxiliary.module';

//=============================================================
@Injectable()
export class ConfigServiceTest {
    public v = 'ConfigServiceTest';
}

@Injectable()
class DevelopmentConfigService {
    public v = 'DevelopmentConfigService';
}

@Injectable()
class ProductionConfigService {
    public v = 'ProductionConfigService';
}
//==================================================================
export const useClassTest = {
    provide: 'UseClassTest',
    useClass: (() => {
        console.log('process.env.NODE_ENV in useClassTest provider =', process.env.NODE_ENV); // undefined ???
        return process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService;
    })(),
};
//=============================================================
const useFactoryTest = {
    provide: 'UseFactoryTest',
    useFactory: async (configServiceTest: ConfigServiceTest, configService: ConfigService, aux: AuxiliaryService) => {
        console.log('useFactoryTest provider process.env.NODE_ENV = ', process.env.NODE_ENV);
        console.log('useFactoryTest provider configService.get(NODE_ENV) = ', configService.get('NODE_ENV'));
        console.log('useFactoryTest provider configServiceTest.v = ', configServiceTest.v);
        // console.log('AUX ', await aux.getConfigFromDB());
        // console.log('configService444 = ', configService.get('q'));

        return process.env.NODE_ENV === 'development' ? new DevelopmentConfigService() : new ProductionConfigService();
    },
    inject: [ConfigServiceTest, ConfigService, AuxiliaryService],
};
//=========================================================

@Global()
@Module({
    imports: [
        // ProductsModule,
        MongooseModule.forFeature([{ name: Tester.name, schema: TesterSchema }]),
        HttpModule,
        AuxiliaryModule,
    ],
    controllers: [TesterController],
    providers: [
        TesterService,
        TesterAService,
        TesterBService,
        ConfigServiceTest,
        useFactoryTest,
        useClassTest,
        AuxiliaryService,
    ],
    exports: [TesterService, useFactoryTest, useClassTest],
})
export class TesterModule {}
