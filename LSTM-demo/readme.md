* 运行**train.py**训练神经网络，并将训练好的模型保存至Model文件夹

* 运行**generate.py**读取模型并生成音乐，保存至output文件夹

  * 可以修改的参数：

    generate.py里的x_initializer、a_initializer、c_initializer，其中x_initializer是第一个音符（一个大小为（1，1，78）的张量），a和c都是网络的参数，没什么实际意义。

  * 运行的时候需要安装的一些库：

    cudnn & cuda : https://blog.csdn.net/sinat_23619409/article/details/84202651 

    直接pip install：

    * tensorflow
    * music21
    * keras
    * matplotlib

* 要使用整个音乐生成模块直接用generate.py就可以，其它都不用管。

* 原理：https://hekuan.blog.csdn.net/article/details/80890454?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param

* 本来设想的是根据不同色系可以生成不同风格的音乐，但我轻音乐和摇滚的训练midi放进去稍微有点问题所以模型还没训练好（太菜了对不起大家），所以demo的话或许可以把得到的一些rgb值直接映射到【0，1】之间，作为x_initializer的值，这样可以生成不同的音乐。



P.S. 可能计算量有点大，盲猜教室的电脑跑不出来，笔记本不知道可不可以跑得动。如果不行的话，最后整合好了可以在我的台式上录屏。