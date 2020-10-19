# coding:utf-8
'''
整体思路:
        1)加载RGB图像，并转换为Kmeans可聚类的数据形式;
        2)设置聚类中心数目，采用Kmeans聚类;
        3)将所有颜色聚合到Kmeans聚类结果，显示聚合后的图像以及主要颜色组成的色卡
'''


import cv2
from skimage import io
import numpy as np
from sklearn.cluster import KMeans


def getColor(filename):
    # 图像路径
    # K：聚类的数目（k=4，则整张图像聚合成四种颜色）
    K = 4

    # 读取图像
    img = cv2.imread(filename)
    if (img is None):
        print(' Failed to read picture... ')

    # 将Opencv中图像默认BGR转换为通用的RGB格式
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    # 获取图像长宽信息
    (height, width, channels) = img_rgb.shape
    # 将图像数据转换为需要进行Kmeans聚类的Data
    img_data = img_rgb.reshape(height * width, channels)
    img_res0 = img_data

    # 调用sklearn中Kmeans函数处理图像
    kmeans = KMeans(n_clusters=K)
    kmeans.fit(img_data)

    # Kmeans.labels_：每个点的标签(标签即为聚合结果颜色的序号)
    labels = np.asarray(kmeans.labels_, dtype=np.uint8)
    # 将所有像素点的标签值转化为和原图像长宽相等，方便处理原图像
    labels = labels.reshape(height, width)

    # 聚合结果颜色
    color_label = {}
    for i in range(len(kmeans.cluster_centers_)):
        color_label[i] = kmeans.cluster_centers_[i]
    # 创建字典对应关系：标签为m的像素点数目，对应标签为m的聚合结果颜色值
    color_num = {}
    for m in range(len(np.unique(kmeans.labels_))):
        color_num[np.sum(kmeans.labels_ == m)] = color_label[m]
    # 按照覆盖像素点的多少降序排序
    color_num_sorted = sorted(
        color_num.items(), key=lambda x: x[0], reverse=True)
    # 计算每个标签对应的图像比例
    color_num_ratio = []
    for i in range(len(color_num_sorted)):
        color_num_ratio.append(color_num_sorted[i][0])
    color_num_ratio = color_num_ratio / np.sum(color_num_ratio)

    # 输出图像色卡（格式：所占比例，颜色RGB值）（按所占比例降序输出）
    print("图像色卡：")
    for i in range(len(color_num_sorted)):
        print(color_num_ratio[i])
        print(color_num_sorted[i][1])

    # 将原图像颜色值聚合
    img_res = img_data.reshape(height, width, channels)
    for i in range(height):
        for j in range(width):
            img_res[i][j] = color_label[labels[i][j]]

    # 保存聚合后的图像
    io.imsave('/static/images/compressed_disc.png', img_res)
    print('保存聚合后的图像......')

    # 以下用于显示图像+色卡效果，不需要可以删掉

    # 创建带有色卡的图像
    #color_card = np.zeros(shape=(height, width + 100, 3), dtype=np.int32)
    color_card = np.zeros(shape=(height, width + 100, 3), dtype=np.uint8)
    # 图像左侧区域复制源图像
    for i in range(height):
        for j in range(width):
            color_card[i][j] = img_res[i][j]
    # 图像右侧显示色卡
    start = 0
    for i in range(len(kmeans.cluster_centers_)):
        color = color_num_sorted[i][1]
        row_start = int(color_num_ratio[i] * height)
        # 由于前面的比例为小数，转为Int导致最后部分区域没有色彩，采用最后一种颜色进行填充
        if i == len(kmeans.cluster_centers_) - 1:
            color_card[start:, width:width + 100] = color
        color_card[start: start + row_start, width:width + 100] = color
        start += row_start

    # 保存带有色卡的图像
    io.imsave('/static/images/colorcard_disc.png', color_card)
    print('保存聚合后的图像以及图像色卡......')
